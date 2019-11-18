import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
// import { SectionGrid } from 'react-native-super-grid';

class DetailsScreen extends React.Component {
    render() {
        const items = [
            { name: 'RANK', code: this.props.navigation.getParam('cmc_rank', 'NO-ID')},
            { name: 'PRICE', code: this.props.navigation.getParam('price', 'NO-ID')}, 
            { name: 'TOTAL SUPPLY', code: this.props.navigation.getParam('total_supply', 'NO-ID') },
            { name: 'MAX SUPPLY', code: this.props.navigation.getParam('max_supply', 'NO-ID') },
            { name: 'CIRCULATING SUPPLY', code: this.props.navigation.getParam('circulating_supply', 'NO-ID') },
            { name: 'NUM MARKET PAIRS', code: this.props.navigation.getParam('num_market_pairs', 'NO-ID')}, 
            { name: 'VOLUME 24H', code: this.props.navigation.getParam('volume_24h', 'NO-ID') },
            { name: 'PERCENT CHANGE 1H', code: this.props.navigation.getParam('percent1h', 'NO-ID') },
            { name: 'PERCENT CHANGE 24H', code: this.props.navigation.getParam('percent24h', 'NO-ID') },
            { name: 'PERCENT CHANGE 7D', code: this.props.navigation.getParam('percent7d', 'NO-ID') },
            { name: 'LAST UPDATED', code: this.props.navigation.getParam('last_updated', 'NO-ID')},
            { name: 'DATE ADDED', code: this.props.navigation.getParam('date_added', 'NO-ID') },
          ];
        return(
            <View style={{flex:1, backgroundColor: '#1f3252'}}>
                <Text style={{ textAlign: "center", paddingTop: 35, fontSize: 35,fontWeight: 'bold', color: 'white'}}> {this.props.navigation.getParam('name', 'NO-ID')} | {this.props.navigation.getParam('symbol', 'NO-ID')} </Text>
            <FlatGrid
                itemDimension={150}
                items={items}
                style={styles.gridView}
                renderItem={({ item, index }) => (
                <View style={[styles.itemContainer, { backgroundColor: 'white' }]}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemCode}>{item.code}</Text>
                </View>
                )}/>
            </View>

            );
        }
}
const styles = StyleSheet.create({
    gridView: {
      marginTop: 20,
      flex: 1,
    },
    itemContainer: {
      justifyContent: 'center',
      alignItems: "center",
      borderRadius: 10,
      padding: 10,
      height: 120,
    },
    itemName: {
      padding:3,
      fontSize: 14,
      color: 'black',
      fontWeight: 'bold',

    },
    itemCode: {
      fontSize: 12,
      color: 'black',
      padding:3
    },
  });

export default DetailsScreen;