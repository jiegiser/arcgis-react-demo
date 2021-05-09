import React, { useEffect, useRef } from 'react'
import { Map, SceneView, FeatureLayer, WebTileLayer } from '../../modules/arcgis.modules'
import './index.css'

const MapContainer = () => {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const map = createMap()
    addTdtLayers(map)
    // addLayers(map)
    return () => {
      map && map.destroy()
    }
  }, [])

  const createMap = () => {
    const map = new Map({
      // basemap: 'osm',
      ground: 'world-elevation'
    })

    mapRef.current && new SceneView({
      map: map,
      // center: [-118.805, 34.027],
      center: [103, 36],
      zoom: 13,
      container: mapRef.current
    })
    return map
  }

  const addLayers = (map: Map) => {
    const trailheadsLayer = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0"
    })
    map.add(trailheadsLayer)
  }

  const addTdtLayers = (map: Map) => {

    var tiledLayer = new WebTileLayer({
      urlTemplate: 'http://{subDomain}.tianditu.gov.cn/DataServer?T=vec_w&x={col}&y={row}&l={level}&tk=秘钥',
      subDomains: ["t0", "t1", "t2", "t3","t4", "t5", "t6", "t7"],
    })

    var tiledLayer_poi = new WebTileLayer({
      urlTemplate:
          "http://{subDomain}.tianditu.gov.cn/DataServer?T=cva_w&x={col}&y={row}&l={level}&tk=秘钥",
      subDomains: ["t0", "t1", "t2", "t3","t4", "t5", "t6", "t7"],
    })

    map.layers.addMany([tiledLayer, tiledLayer_poi])
  }

  return (
    <div ref={mapRef} className="map-container"></div>
  )
}

export default MapContainer
