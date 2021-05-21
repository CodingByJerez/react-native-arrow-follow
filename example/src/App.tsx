import * as React from 'react';
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ArrowFollow, ICorner, IDirection } from 'react-native-arrow-follow';

type IData = {
  start: { corner: ICorner; direction: IDirection };
  end: { corner: ICorner; direction: IDirection };
}[];

const widthCard = Dimensions.get('window').width / 2;

const DATA: IData = [
  //Type A
  {
    start: { corner: 'BOTTOM_LEFT', direction: 'HORIZONTAL' },
    end: { corner: 'BOTTOM_RIGHT', direction: 'HORIZONTAL' },
  },
  {
    start: { corner: 'BOTTOM_RIGHT', direction: 'HORIZONTAL' },
    end: { corner: 'BOTTOM_LEFT', direction: 'HORIZONTAL' },
  },
  {
    start: { corner: 'TOP_RIGHT', direction: 'HORIZONTAL' },
    end: { corner: 'TOP_LEFT', direction: 'HORIZONTAL' },
  },
  {
    start: { corner: 'TOP_LEFT', direction: 'HORIZONTAL' },
    end: { corner: 'TOP_RIGHT', direction: 'HORIZONTAL' },
  },
  {
    start: { corner: 'TOP_LEFT', direction: 'VERTICAL' },
    end: { corner: 'BOTTOM_LEFT', direction: 'VERTICAL' },
  },

  {
    start: { corner: 'BOTTOM_RIGHT', direction: 'VERTICAL' },
    end: { corner: 'TOP_RIGHT', direction: 'VERTICAL' },
  },

  {
    start: { corner: 'BOTTOM_LEFT', direction: 'VERTICAL' },
    end: { corner: 'TOP_LEFT', direction: 'VERTICAL' },
  },
  {
    start: { corner: 'TOP_RIGHT', direction: 'VERTICAL' },
    end: { corner: 'BOTTOM_RIGHT', direction: 'VERTICAL' },
  },
  // type B
  {
    start: { corner: 'TOP_LEFT', direction: 'HORIZONTAL' },
    end: { corner: 'BOTTOM_RIGHT', direction: 'VERTICAL' },
  },
  {
    start: { corner: 'TOP_RIGHT', direction: 'HORIZONTAL' },
    end: { corner: 'BOTTOM_LEFT', direction: 'VERTICAL' },
  },

  {
    start: { corner: 'BOTTOM_LEFT', direction: 'HORIZONTAL' },
    end: { corner: 'TOP_RIGHT', direction: 'VERTICAL' },
  },
  {
    start: { corner: 'BOTTOM_RIGHT', direction: 'HORIZONTAL' },
    end: { corner: 'TOP_LEFT', direction: 'VERTICAL' },
  },
  //
  {
    start: { corner: 'BOTTOM_RIGHT', direction: 'VERTICAL' },
    end: { corner: 'TOP_LEFT', direction: 'HORIZONTAL' },
  },
  {
    start: { corner: 'BOTTOM_LEFT', direction: 'VERTICAL' },
    end: { corner: 'TOP_RIGHT', direction: 'HORIZONTAL' },
  },
  {
    start: { corner: 'TOP_RIGHT', direction: 'VERTICAL' },
    end: { corner: 'BOTTOM_LEFT', direction: 'HORIZONTAL' },
  },
  {
    start: { corner: 'TOP_LEFT', direction: 'VERTICAL' },
    end: { corner: 'BOTTOM_RIGHT', direction: 'HORIZONTAL' },
  },
  //
  {
    start: { corner: 'BOTTOM_LEFT', direction: 'VERTICAL' },
    end: { corner: 'TOP_RIGHT', direction: 'HORIZONTAL' },
  },
  {
    start: { corner: 'BOTTOM_RIGHT', direction: 'VERTICAL' },
    end: { corner: 'TOP_LEFT', direction: 'HORIZONTAL' },
  },
  {
    start: { corner: 'TOP_LEFT', direction: 'VERTICAL' },
    end: { corner: 'BOTTOM_RIGHT', direction: 'HORIZONTAL' },
  },
  {
    start: { corner: 'TOP_RIGHT', direction: 'VERTICAL' },
    end: { corner: 'BOTTOM_LEFT', direction: 'HORIZONTAL' },
  },
  //
  {
    start: { corner: 'TOP_RIGHT', direction: 'HORIZONTAL' },
    end: { corner: 'BOTTOM_LEFT', direction: 'VERTICAL' },
  },
  {
    start: { corner: 'TOP_LEFT', direction: 'HORIZONTAL' },
    end: { corner: 'BOTTOM_RIGHT', direction: 'VERTICAL' },
  },
  {
    start: { corner: 'BOTTOM_RIGHT', direction: 'HORIZONTAL' },
    end: { corner: 'TOP_LEFT', direction: 'VERTICAL' },
  },
  {
    start: { corner: 'BOTTOM_LEFT', direction: 'HORIZONTAL' },
    end: { corner: 'TOP_RIGHT', direction: 'VERTICAL' },
  },
  //

  // Type C
  {
    start: { corner: 'TOP_LEFT', direction: 'VERTICAL' },
    end: { corner: 'BOTTOM_RIGHT', direction: 'VERTICAL' },
  },
  {
    start: { corner: 'TOP_RIGHT', direction: 'VERTICAL' },
    end: { corner: 'BOTTOM_LEFT', direction: 'VERTICAL' },
  },
  {
    start: { corner: 'BOTTOM_RIGHT', direction: 'VERTICAL' },
    end: { corner: 'TOP_LEFT', direction: 'VERTICAL' },
  },
  {
    start: { corner: 'BOTTOM_LEFT', direction: 'VERTICAL' },
    end: { corner: 'TOP_RIGHT', direction: 'VERTICAL' },
  },
  //
  {
    start: { corner: 'TOP_RIGHT', direction: 'VERTICAL' },
    end: { corner: 'BOTTOM_LEFT', direction: 'VERTICAL' },
  },
  {
    start: { corner: 'TOP_LEFT', direction: 'VERTICAL' },
    end: { corner: 'BOTTOM_RIGHT', direction: 'VERTICAL' },
  },
  {
    start: { corner: 'BOTTOM_LEFT', direction: 'VERTICAL' },
    end: { corner: 'TOP_RIGHT', direction: 'VERTICAL' },
  },
  {
    start: { corner: 'BOTTOM_RIGHT', direction: 'VERTICAL' },
    end: { corner: 'TOP_LEFT', direction: 'VERTICAL' },
  },
  //

  {
    start: { corner: 'TOP_LEFT', direction: 'HORIZONTAL' },
    end: { corner: 'BOTTOM_RIGHT', direction: 'HORIZONTAL' },
  },
  {
    start: { corner: 'TOP_RIGHT', direction: 'HORIZONTAL' },
    end: { corner: 'BOTTOM_LEFT', direction: 'HORIZONTAL' },
  },
  {
    start: { corner: 'BOTTOM_RIGHT', direction: 'HORIZONTAL' },
    end: { corner: 'TOP_LEFT', direction: 'HORIZONTAL' },
  },
  {
    start: { corner: 'BOTTOM_LEFT', direction: 'HORIZONTAL' },
    end: { corner: 'TOP_RIGHT', direction: 'HORIZONTAL' },
  },
  //
  {
    start: { corner: 'TOP_RIGHT', direction: 'HORIZONTAL' },
    end: { corner: 'BOTTOM_LEFT', direction: 'HORIZONTAL' },
  },
  {
    start: { corner: 'TOP_LEFT', direction: 'HORIZONTAL' },
    end: { corner: 'BOTTOM_RIGHT', direction: 'HORIZONTAL' },
  },
  {
    start: { corner: 'BOTTOM_LEFT', direction: 'HORIZONTAL' },
    end: { corner: 'TOP_RIGHT', direction: 'HORIZONTAL' },
  },
  {
    start: { corner: 'BOTTOM_RIGHT', direction: 'HORIZONTAL' },
    end: { corner: 'TOP_LEFT', direction: 'HORIZONTAL' },
  },
  //
];

export default function App() {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        numColumns={2}
        data={DATA}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <View style={StyleSheet.flatten([styles.arrowContainer, { width: widthCard / 2, height: widthCard / 1.5 }])}>
              <ArrowFollow //
                width={widthCard / 2}
                height={widthCard / 1.5}
                size={14}
                start={item.start}
                end={item.end}
              />
            </View>

            <Text style={styles.title}>START</Text>
            <Text>corner: {item.start.corner}</Text>
            <Text>direction: {item.start.direction}</Text>
            <Text style={styles.title}>END</Text>
            <Text>corner: {item.end.corner}</Text>
            <Text>direction: {item.end.direction}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderColor: '#000000',
    padding: 10,
    width: widthCard,
  },
  arrowContainer: {
    alignSelf: 'center',
    // borderColor: '#000',
    // borderWidth: 1,
  },
  title: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
