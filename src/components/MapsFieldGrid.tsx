import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, Alert, ScrollView } from 'react-native';
import SelectItems from './SelectItems';
import Basic from './basic';
import useFieldStore, { FieldType, getAllFields } from '../zustand/field';
import uuid from 'react-native-uuid';
import { useShallow } from 'zustand/react/shallow';
import { Marker, Polygon } from 'react-native-maps';
import { calculatePolygonCenter } from '../screens/MapsPage';

const MapsFieldGrid: React.FC<{ allFields: FieldType[] }> = ({ }) => {

  const allFields = useFieldStore((state) => state.allFields);


  const renderGrid = (pId: number) => {

    let mapsGrid:any[] =[];

    const filteredLocation = allFields.filter(val => ((val.parentId === pId)))
   
    filteredLocation.map((val,index)=>{
       
        mapsGrid.push(

          [
        
            <Polygon fillColor={val.maps.color + "44"} coordinates={val.maps.cordinats} />,

            <Marker
                onPress={() => { }}
                children={
                    renderGrid(val.id).length > 0 ? renderGrid(val.id)
                    : <Basic pId={val.id} ></Basic>
                }

                stopPropagation={true}
                pinColor="blue"
                title={val.id.toString()}
                coordinate={calculatePolygonCenter(val.maps.cordinats)

                } />
          ]
    
          );
    })


    
    return mapsGrid;
  };




  console.log("DG:", allFields.length)
  return (
    <View style={styles.container}>

      {renderGrid(0)}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: "100%",
    minHeight: "100%",
    flex: 1,
    padding: 5,
    flexWrap: "wrap",

  },
  row: {
    flexDirection: 'row',
    flex: 1

  },
  item: {
    minWidth: 100,
    minHeight: 50,
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    padding: 5,

  },

});

export default MapsFieldGrid
