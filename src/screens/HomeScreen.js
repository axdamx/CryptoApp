import React from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Alert } from 'react-native';

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isLoading: true, dataSource: []}
    }

    componentDidMount() {
        fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
            method: 'GET',
            headers: {
                'X-CMC_PRO_API_KEY': 'fd9c5e84-4b52-4878-8b28-5376f08793a4'
            }
        })
        .then(res => res.json())
        .then((data) => {
            this.setState({ dataSource: data, isLoading: false})
            console.log(this.state.dataSource)
        }).catch(console.log)
    }

      renderItem = ({item}) => {
        const usdPrice = item.quote.USD.price
        const percent24h = item.quote.USD.percent_change_24h
        const percent7d = item.quote.USD.percent_change_7d
        const percent1h = item.quote.USD.percent_change_1h
        const marketCap = item.quote.USD.market_cap
        const volume24h = item.quote.USD.volume_24h

        return (
            <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('DetailsScreen', {
                    name: item.name,
                    symbol: item.symbol,
                    cmc_rank: item.cmc_rank,
                    total_supply: item.total_supply,
                    max_supply: item.max_supply,
                    circulating_supply: item.circulating_supply,
                    num_market_pairs: item.num_market_pairs,
                    date_added: item.date_added,
                    price: usdPrice.toFixed(2),
                    market_cap: marketCap.toFixed(2),
                    volume_24h: volume24h.toFixed(2),
                    percent1h: percent1h.toFixed(2),
                    percent24h: percent24h.toFixed(2),
                    percent7d: percent7d.toFixed(2),
                    last_updated: item.quote.USD.last_updated
                })}>
                <View style = {style.cardViewStyle}>
                    <View style={style.cardStyle}>
                        <Text style={style.textStyle}>{item.symbol} | {item.name}</Text>
                        {percent24h.toFixed(2) > 0 ? <Text style={{color:'green'}}>24h: {percent24h.toFixed(2)} % </Text>: <Text style={{color: 'red'}}>24h: {percent24h.toFixed(2)} %</Text> }
                    </View>
                    <View style={style.cardStyle}>
                        <Text style={style.textStyle}> {usdPrice.toFixed(2)} $ </Text>
                        {percent7d.toFixed(2) > 0 ? <Text style={{color:'green'}}>7d: {percent7d.toFixed(2)} % </Text>: <Text style={{color: 'red'}}>7d: {percent7d.toFixed(2)} %</Text> }
                    </View>
                </View>
            </TouchableOpacity>
            )
        }

    render() {
        if(this.state.isLoading){
            return(
                <View>
                    <ActivityIndicator />
                </View>
            )
        }
        return(
            <View style={{backgroundColor: '#1f3252'}}>
                <FlatList 
                    data={this.state.dataSource.data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.description}
                />
            </View>
        )
    }
}

const style = StyleSheet.create({
    textStyle:{
        fontSize: 15,
        fontWeight: 'bold',
        padding: 10
    },
    cardStyle:{
        flex:1,
        flexDirection: 'column',
        padding: 5,
        alignItems: "center"
    },
    cardViewStyle:{
        flexDirection:"row",
        borderRadius:5,
        padding: 25, 
        margin: 10,
        backgroundColor: "white"
    }
})

export default HomeScreen;