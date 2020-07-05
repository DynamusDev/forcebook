import React, { FunctionComponent as Component, useState, useEffect } from "react"
import { FlatList, ScrollView, Platform, TextStyle, View, ViewStyle, Modal, YellowBox } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { CommonButton, Header, Text, Screen, HeaderButton } from "../../components"
import { color, spacing } from "../../theme"
import AsyncStorage from "@react-native-community/async-storage"
import { swapi } from "../../services/api"

console.disableYellowBox = true;

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  alignItems: 'center',
  justifyContent: 'flex-start',
  flex: 1
}
const PLANETSLIST: ViewStyle = {
  flex:1,
  maxHeight: '100%',
  width:'100%'
}
const BUTTON: ViewStyle = {
  height:40,
  justifyContent: 'center',
  width:'100%',
  paddingHorizontal:5,
  borderWidth:0.5,
  borderColor:'#444'
}
const ALERTCENTERED: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22
}
const ALERTTEXT: TextStyle = {
  width: '80%',
  textAlignVertical: 'center',
  textAlign: "center",
  fontWeight: '600',
  fontSize: 20,
  color: color.palette.lightGrey
}
const ALERTVIEW: ViewStyle = {
  margin: 20,
  height: '50%',
  width: '90%',
  backgroundColor: color.palette.white,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: color.palette.lightGrey,
  padding: 10,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5
}
const HEADERMODAL: ViewStyle = {
  flexDirection: 'row',
  height: '10%',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 15
}
const SEPARATE: ViewStyle = {
  width: 32,
  height: 10
}
const TIMMING: ViewStyle = {
  width: '100%',
  height: 65,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
}
const MODALBODY: ViewStyle = {
  width: '100%',
  height: 'auto'
}
const CONTENT: ViewStyle = {
  width: '100%',
  height: 65,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
}
const TIME: ViewStyle = {
  height: 45,
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
}
const ALERTCENTEREDT: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22
}
const ALERTTEXTT: TextStyle = {
  marginBottom: 15,
  textAlign: "center",
  fontWeight: '600',
  fontSize: 20,
  color: color.palette.lightGrey
}

export const Starships: Component = observer(function Starships() {
  const [starships, setStarships] = useState([])
  const [starship, setStarship] = useState([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    loadStarships()
  }, []);

  async function loadStarship(starships) {
    setStarship(starships)
    setModalVisible(true)
  }

  async function loadStarships() {

    if(loading) {
      return;
    }

    if(total > 0 && starships.length == total){
      return;
    }

    setLoading(true);

    const response = await swapi.get(`starships/?page=${page}`);

    setStarships([...starships, ...response.data.results]);
    setTotal(response.data.count);
    setPage(page + 1);
    setLoading(false);
  }
  function logout() {
    AsyncStorage.clear();
    navigation.navigate('login');
  };

  return (
    <View style={FULL}>
      <Screen style={CONTAINER} preset='fixed' backgroundColor={color.transparent}>
        <Header headerText='Starships'
          leftIcon='logout' onLeftPress={() => { logout() }}
          style={{ height: 55 }}
          titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
          background={color.palette.black}
        />
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType={"slide"}
          onRequestClose={ () => { setModalVisible(false) } } >
            <View style={ALERTCENTERED}>
              <View style={ALERTVIEW}>
                <View style={HEADERMODAL}>
                  <View style={SEPARATE}/>
                  <Text style={ALERTTEXT}>{starship.name}</Text>
                  <HeaderButton name='close' onPress={() => { setModalVisible(false) }} />
                </View>
                <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }} style={MODALBODY}>
                  <View style={TIMMING}>
                    <View style={TIME}>
                      <Text style={{textAlign: 'center'}} preset="fieldLabelTitle" text="Fabricante" />
                      <Text style={{textAlign: 'center'}} preset="fieldLabel" text={starship.manufacturer} />
                    </View>
                    <View style={TIME}>
                      <Text style={{textAlign: 'center'}} preset="fieldLabelTitle" text="Valor" />
                      <View style={{...TIMMING, height: 18}} >
                        <Text style={{textAlign: 'center'}} preset="fieldLabel" text={starship.cost_in_credits} />
                        <Text style={{textAlign: 'center'}} preset="fieldLabel" text=' créditos' />
                      </View>
                    </View>
                  </View>
                  <View style={TIMMING}>
                    <View style={TIME}>
                      <Text style={{textAlign: 'center'}} preset="fieldLabelTitle" text="Comprimento" />
                      <View style={{...TIMMING, height: 18}} >
                        <Text style={{textAlign: 'center'}} preset="fieldLabel" text={starship.length} />
                        <Text style={{textAlign: 'center'}} preset="fieldLabel" text=' cm' />
                      </View>
                    </View>
                    <View style={TIME}>
                      <Text style={{textAlign: 'center'}} preset="fieldLabelTitle" text="Velocidade Atmosférica Max " />
                      <Text style={{textAlign: 'center'}} preset="fieldLabel" text={starship.max_atmosphering_speed} />
                    </View>
                  </View>
                  <View style={TIMMING}>
                    <View style={TIME}>
                      <Text style={{textAlign: 'center'}} preset="fieldLabelTitle" text="Número de Passageiros" />
                      <Text style={{textAlign: 'center'}} preset="fieldLabel" text={starship.passengers} />
                    </View>
                    <View style={TIME}>
                      <Text style={{textAlign: 'center'}} preset="fieldLabelTitle" text="Capacidade de carga" />
                      <Text style={{textAlign: 'center'}} preset="fieldLabel" text={starship.cargo_capacity} />
                    </View>
                  </View>
                  <View style={TIMMING}>
                    <View style={TIME}>
                      <Text style={{textAlign: 'center'}} preset="fieldLabelTitle" text="Classificação do Hyperdrive" />
                      <Text style={{textAlign: 'center'}} preset="fieldLabel" text={starship.hyperdrive_rating} />
                    </View>
                    <View style={TIME}>
                      <Text style={{textAlign: 'center'}} preset="fieldLabelTitle" text="MGLT" />
                      <Text style={{textAlign: 'center'}} preset="fieldLabel" text={starship.MGLT} />
                    </View>
                  </View>
                  <View style={TIMMING}>
                    <View style={TIME}>
                      <Text style={{textAlign: 'center'}} preset="fieldLabelTitle" text="Classe de Espaçonave" />
                      <Text style={{textAlign: 'center'}} preset="fieldLabel" text={starship.starship_class} />
                    </View>
                    <View style={TIME}/>
                  </View>

                </ScrollView>
              </View>
            </View>
          </Modal>
        <FlatList
            data={ starships }
            style={PLANETSLIST}
            contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
            showsVerticalScrollIndicator={false}
            keyExtractor={starship => String(starship.id)}
            onEndReached={loadStarships}
            onEndReachedThreshold={0.1}
            renderItem={({item:starships}) => (
              <View style={{alignItems: 'center'}}>
                <CommonButton
                  onPress={() => {loadStarship(starships)}}
                  style={BUTTON}
                  textStyle={{color: color.palette.black}}
                  name={starships.name}
                />
                <Text style={{color: color.palette.black, fontStyle: 'italic'}}>Clique para ver mais informações</Text>
              </View>
            )}
          />
      </Screen>
    </View>
  )
})
