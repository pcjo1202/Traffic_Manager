/*global kakao*/
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import MainArea from '../../components/MainArea/MainArea';

const Directions = () => {
  const [좌표, set좌표] = useState({
    위도: 37.3046967,
    경도: 127.9226353,
  });

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(좌표.위도, 좌표.경도), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    const imageSrc =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    const markerPosition = new kakao.maps.LatLng(좌표.위도, 좌표.경도);

    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    marker.setMap(map);
  }, []);

  return (
    <MainArea>
      <Header title='길찾기' />
      <div id='map' style={{ width: '100%', height: '100%' }}></div>
    </MainArea>
  );
};

export default Directions;
