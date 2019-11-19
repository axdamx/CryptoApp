import React from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Button, Alert, RefreshControl, TextInput } from 'react-native';

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true, 
            isRefreshing: false,
            dataSource: [],
            filteredData: [],
            searchText: ''
        }
    }

    componentDidMount() {
        this.fetchApi()
    }

    fetchApi = () => {
        fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
            method: 'GET',
            headers: {
                'X-CMC_PRO_API_KEY': 'fd9c5e84-4b52-4878-8b28-5376f08793a4'
            }
        })
        .then(res => res.json())
        .then((data) => {
            this.setState({ dataSource: data, isLoading: false,  isRefreshing: false})
            // console.log(this.state.dataSource)
        }).catch(console.log)
    }
    
    search = (searchText) => {
        this.setState({searchText: searchText});
        let filteredData = this.state.dataSource.data.filter(function (item) {
            return item.name.includes(searchText)
        })
        this.setState({filteredData: filteredData})
    }

      onRefresh() {
        this.setState({ isRefreshing: true }); 
        this.fetchApi()
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
                        {percent24h.toFixed(2) > 0 ? <Text style={style.textStyle}>24h: <Text style={{color: 'green'}}> {percent24h.toFixed(2)}% 
                         {/* <Icon
                        name='caretup'
                        color='green'
                        size={13}
                        type="antdesign"
                        /> */}
                        </Text></Text>: <Text style={style.textStyle}>24h: <Text style={{color: 'red'}}> {percent24h.toFixed(2)}% 
                         {/* <Icon
                        name='caretdown'
                        color='red'
                        size={13}
                        type="antdesign"
                        /> */}
                        </Text></Text> }
                    </View>
                    <View style={style.cardStyle}>
                        <Text style={style.textStyle}> {usdPrice.toFixed(2)} $ </Text>
                        {percent7d.toFixed(2) > 0 ? <Text style={style.textStyle}>7d: <Text style={{color: 'green'}}> {percent7d.toFixed(2)}% 
                         {/* <Icon
                        name='caretup'
                        color='green'
                        size={13}
                        type="antdesign"
                        /> */}
                        </Text></Text>: <Text style={style.textStyle}>7d: <Text style={{color: 'red'}}> {percent7d.toFixed(2)}%
                         {/* <Icon
                        name='caretdown'
                        color='red'
                        size={13}
                        type="antdesign"
                        /> */}
                        </Text></Text> }
                    </View>
                </View>
            </TouchableOpacity>
            )
        }

    render() {
        if(this.state.isLoading){
            return(
                <View style={{...StyleSheet.absoluteFill, alignItems:"center", justifyContent: "center"}}>
                    <ActivityIndicator size="large" color='white'/>
                </View>
            )
        }
        return(
            <View style={{backgroundColor: '#1f3252', flex:1}}>
            <TextInput
                style={style.searchBarStyle}
                onChangeText={this.search}
                value={this.state.searchText}
                placeholder="Search Here"
                placeholderTextColor= 'white'
            />
                <FlatList 
                    data={this.state.filteredData && this.state.filteredData.length > 0 ? this.state.filteredData : this.state.dataSource.data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.description}
                    extraData={this.state}
                    refreshControl={
                        <RefreshControl
                          refreshing={this.state.isRefreshing}
                          onRefresh={this.onRefresh.bind(this)}
                        />
                      }
                    onEndReachedThreshold={0.4}
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
    },
    searchBarStyle: {
        color: 'white',
        backgroundColor: '#304c7a',
        paddingHorizontal: 10,
        margin: 10,
        height: 50,
        borderColor: "gray",
        borderWidth: 1,
        fontSize: 20
    }
})

export default HomeScreen;