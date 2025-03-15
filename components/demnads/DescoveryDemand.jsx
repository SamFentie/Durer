import { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import DesoveryDemandsSimplifed from "./DesoveryDemandsSimplifed";

const data = [
  { key: "1" },
  { key: "2" },
  { key: "3" },
  { key: "4" },
  { key: "5" },
  { key: "6" },
  { key: "7" },
  { key: "8" },
  { key: "9" },
];

const minCols = 2;

// const calcNumColumns = (width) => {
//   const cols = width / styles.item.width;
//   const colsFloor = Math.floor(cols) > minCols ? Math.floor(cols) : minCols;
//   const colsMinusMargin = cols - 2 * colsFloor * styles.item.margin;
//   if (colsMinusMargin < colsFloor && colsFloor > minCols) {
//     return colsFloor - 1;
//   } else return colsFloor;
// };

const DescoveryDemand = ({ demands }) => {
  const { width } = useWindowDimensions();
  //   const [numColumns, setNumColumns] = useState(calcNumColumns(width));

  //   useEffect(() => {
  //     setNumColumns(calcNumColumns(width));
  //   }, [width]);

  return (
    <View>
      {demands && (
        <FlatList
          //   key={numColumns}

          data={demands}
          renderItem={({ item ,index}) => <DesoveryDemandsSimplifed item={item} key={index}/>}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          //   pagingEnabled
          //   snapToAlignment="center"
          //   showsHorizontalScrollIndicator={false}
          // onScroll={handleOnScroll}
          // onViewableItemsChanged={handleOnViewableItemsChanged}
          // viewabilityConfig={viewabilityConfig}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "lightblue",
    height: 400,
  },
});

export default DescoveryDemand;
