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
  paddingHorizontal:28,
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
  width: '80%',
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

export const Planetas: Component = observer(function Planetas() {
  const [planetas, setPlanetas] = useState([])
  const [planeta, setPlaneta] = useState([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    loadPlanetas()
  }, []);

  async function loadPlaneta(planetas) {
    setPlaneta(planetas)
    setModalVisible(true)
  }

  async function loadPlanetas() {

    if(loading) {
      return;
    }

    if(total > 0 && planetas.length == total){
      return;
    }

    setLoading(true);

    const response = await swapi.get(`planets/?page=${page}`);

    setPlanetas([...planetas, ...response.data.results]);
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
        <Header headerText='Planetas'
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
                  <Text style={ALERTTEXT}>{planeta.name}</Text>
                  <HeaderButton name='close' onPress={() => { setModalVisible(false) }} />
                </View>
                <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }} style={MODALBODY}>
                  <View style={TIMMING}>
                    <View style={TIME}>
                      <Text preset="fieldLabelTitle" text="Período de Rotação" />
                      <View style={{...TIMMING, height: 18}} >
                        <Text preset="fieldLabel" text={planeta.rotation_period} />
                        <Text preset="fieldLabel" text=' horas' />
                      </View>
                    </View>
                    <View style={TIME}>
                      <Text preset="fieldLabelTitle" text="Período Orbital" />
                      <View style={{...TIMMING, height: 18}} >
                        <Text preset="fieldLabel" text={planeta.orbital_period} />
                        <Text preset="fieldLabel" text=' dias' />
                      </View>
                    </View>
                  </View>
                  <View style={TIMMING}>
                    <View style={TIME}>
                      <Text preset="fieldLabelTitle" text="Diâmetro" />
                      <Text preset="fieldLabel" text={planeta.diameter} />
                    </View>
                    <View style={TIME}>
                      <Text preset="fieldLabelTitle" text="Clima" />
                      <Text preset="fieldLabel" text={planeta.climate} />
                    </View>
                  </View>
                  <View style={TIMMING}>
                    <View style={TIME}>
                      <Text preset="fieldLabelTitle" text="Gravidade" />
                      <Text preset="fieldLabel" text={planeta.gravity} />
                    </View>
                    <View style={TIME}>
                      <Text preset="fieldLabelTitle" text="Terreno" />
                      <Text preset="fieldLabel" text={planeta.terrain} />
                    </View>
                  </View>
                  <View style={TIMMING}>
                    <View style={TIME}>
                      <Text preset="fieldLabelTitle" text="População" />
                      <Text preset="fieldLabel" text={planeta.population} />
                    </View>
                    <View style={TIME} />
                  </View>

                </ScrollView>
              </View>
            </View>
          </Modal>
        <FlatList
            data={ planetas }
            style={PLANETSLIST}
            contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
            showsVerticalScrollIndicator={false}
            keyExtractor={planeta => String(planeta.id)}
            onEndReached={loadPlanetas}
            onEndReachedThreshold={0.1}
            renderItem={({item:planetas}) => (
              <View style={{alignItems: 'center'}}>
                <CommonButton
                  onPress={() => {loadPlaneta(planetas)}}
                  style={BUTTON}
                  textStyle={{color: color.palette.black}}
                  name={planetas.name}
                />
                <Text style={{color: color.palette.black, fontStyle: 'italic'}}>Clique para ver mais informações</Text>
              </View>
            )}
          />
      </Screen>
    </View>
  )
})
