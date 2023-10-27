import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  GoogleMap,
  Libraries,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { Button } from "react-bootstrap";
import { saveSippingMapLocation } from "../../redux/user/slice";

const MapPage: React.FC = () => {
  const defualtLocation = { lat: 45.516, lng: -73.56 };
  const libs: Libraries = ["places"];
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [googleAPI, setGoogleAPI] = useState("");
  const [center, setCenter] = useState(defualtLocation);
  const [location, setLocation] = useState(center);

  const mapRef = useRef(null);
  const placeRef = useRef(null);
  const markerRef = useRef(null);

  const getUserCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get("/api/keys/google", {
        headers: { Authorization: `Bearer: ${user?.token}` },
      });
      setGoogleAPI(data.key);
      console.log(data.key);
      getUserCurrentLocation();
    };

    fetch();
  }, [user]);

  const onLoad = (map: any) => {
    mapRef.current = map;
  };
  const onIdle = () => {
    if (mapRef.current) {
      const map: any = mapRef.current;
      setLocation({
        lat: map.center.lat(),
        lng: map.center.lng(),
      });
    }
  };
  const onLoadPlaces = (place: any) => {
    placeRef.current = place;
  };
  const onPlacesChanged = () => {
    const placeCurrent: any = placeRef.current;
    const place = placeCurrent.getPlace()[0].geometry.location;
    setCenter({ lat: place.lat(), lng: place.lng() });
    setLocation({ lat: place.lat(), lng: place.lng() });
  };
  const onMarketLoad = (marker: any) => {
    markerRef.current = marker;
  };
  const onConfirm = () => {
    const placeCurrent: any = placeRef.current;
    const places = placeCurrent.getPlaces() || [{}];
    dispatch(
      saveSippingMapLocation({
        lat: location.lat,
        lng: location.lng,
        address: places[0].formatted_address,
        name: places[0].name,
        vicinity: places[0].vicinity,
        googleAddressId: places[0].id,
      })
    );
    navigate("/shipping");
  };

  return (
    <Layout isFullScreen={true}>
      <Helmet>
        <title>Map</title>
      </Helmet>
      <LoadScript libraries={libs} googleMapsApiKey={googleAPI}>
        <GoogleMap
          id="small-map"
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onIdle={onIdle}
        >
          <StandaloneSearchBox
            onLoad={onLoadPlaces}
            onPlacesChanged={onPlacesChanged}
          >
            <div className="map-input-box">
              <input type="text" placeholder="Enter your address" />
              <Button type="button" onClick={onConfirm}>
                Confirm
              </Button>
            </div>
          </StandaloneSearchBox>
          <Marker position={location} onLoad={onMarketLoad} />
        </GoogleMap>
      </LoadScript>
    </Layout>
  );
};

export default MapPage;
