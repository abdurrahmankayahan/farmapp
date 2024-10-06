import React from 'react';
import { View, StyleSheet,  } from 'react-native';
import Basic from './basic';
import useFieldStore, { FieldType } from '../zustand/field';
import uuid from 'react-native-uuid';


const DynamicGrid: React.FC<{ allFields: FieldType[] }> = ({ }) => {
  //const allFields=useFieldStore((state)=>(state.allFields))
  //parent Id 
  //const addField: any = useFieldState(state=>state.addField)

  // Bileşenleri dinamik olarak oluşturmak için bir fonksiyon
  //usecalback

  const allFields = useFieldStore((state) => state.allFields);


  const renderGrid = (pId: number) => {

    let grid = [];

    const filteredLocation = allFields.filter(val => ((val.parentId === pId)))
    const maxRow = Math.max(...filteredLocation.map(loc => loc.location.row))
    const maxColumn = Math.max(...filteredLocation.map(loc => loc.location.column))

    for (let row = 0; row <= maxRow; row++) {
      let rowItems = [];

      for (let col = 0; col <= maxColumn; col++) {
        const data = filteredLocation.filter((val) => (val.location.row === row &&
          val.location.column === col))[0];

        rowItems.push( 

          <View style={styles.item} key={`i${uuid.v4}-row-${row}-col-${col}`}>
            {renderGrid(data.id).length > 0 ? renderGrid(data.id)
              : <Basic pId={data.id} key={`bc${uuid.v4}-row-${row}-col-${col}`}></Basic>}
            {/* <Basic title={data.product.title} pId={data.id} key={`bc-row-${row}-col-${col}`}></Basic> */}



            {/* <Text>{`R${row + 1} C${col + 1}`}</Text> */}
          </View>


        );
      }

      grid.push(

        <View style={styles.row} key={`row${uuid.v4}-${row}`}>
          {rowItems}
        </View>

      );
    }
    return grid;
  };





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

export default DynamicGrid
