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
const PERSONAGENSLIST: ViewStyle = {
  flex:1,
  maxHeight: '100%',
  width:'100%'
}
const BUTTON: ViewStyle = {
  height:40,
  justifyContent: 'center',
  width:250,
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

export const Personagens: Component = observer(function Personagens() {
  const [personagens, setPersonagens] = useState([])
  const [personagem, setPersonagem] = useState([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    loadPersonagens()
  }, []);

  async function loadPersonagem(personagens) {
    setPersonagem(personagens)
    setModalVisible(true)
  }

  async function loadPersonagens() {

    if(loading) {
      return;
    }

    if(total > 0 && personagens.length == total){
      return;
    }

    setLoading(true);

    const response = await swapi.get(`people/?page=${page}`);

    setPersonagens([...personagens, ...response.data.results]);
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
        <Header headerText='Personagens'
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
                  <Text style={ALERTTEXT}>{personagem.name}</Text>
                  <HeaderButton name='close' onPress={() => { setModalVisible(false) }} />
                </View>
                <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }} style={MODALBODY}>
                  <View style={TIMMING}>
                    <View style={TIME}>
                      <Text preset="fieldLabelTitle" text="Altura" />
                      <View style={{...TIMMING, height: 18}} >
                        <Text preset="fieldLabel" text={personagem.height} />
                        <Text preset="fieldLabel" text=' cm' />
                      </View>
                    </View>
                    <View style={TIME}>
                      <Text preset="fieldLabelTitle" text="Peso" />
                      <View style={{...TIMMING, height: 18}} >
                        <Text preset="fieldLabel" text={personagem.mass} />
                        <Text preset="fieldLabel" text=' kg'/>
                      </View>
                    </View>
                  </View>
                  <View style={TIMMING}>
                    <View style={TIME}>
                      <Text preset="fieldLabelTitle" text="Cor da Pele" />
                      <Text preset="fieldLabel" text={personagem.skin_color} />
                    </View>
                    <View style={TIME}>
                      <Text preset="fieldLabelTitle" text="Cor do Cabelo" />
                      <Text preset="fieldLabel" text={personagem.hair_color} />
                    </View>
                  </View>
                  <View style={TIMMING}>
                    <View style={TIME}>
                      <Text preset="fieldLabelTitle" text="Cor dos Olhos" />
                      <Text preset="fieldLabel" text={personagem.eye_color} />
                    </View>
                    <View style={TIME}>
                      <Text preset="fieldLabelTitle" text="Ano de Nascimento" />
                      <Text preset="fieldLabel" text={personagem.birth_year} />
                    </View>
                  </View>
                  <View style={TIMMING}>
                    <View style={TIME}>
                      <Text preset="fieldLabelTitle" text="Gênero" />
                      <Text preset="fieldLabel" text={personagem.gender} />
                    </View>
                    <View style={TIME} />
                  </View>

                </ScrollView>
              </View>
            </View>
          </Modal>
        <FlatList
            data={ personagens }
            style={PERSONAGENSLIST}
            contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
            showsVerticalScrollIndicator={false}
            keyExtractor={personagem => String(personagem.id)}
            onEndReached={loadPersonagens}
            onEndReachedThreshold={0.1}
            renderItem={({item:personagens}) => (
              <View style={{alignItems: 'center'}}>
                <CommonButton
                  onPress={() => {loadPersonagem(personagens)}}
                  style={BUTTON}
                  textStyle={{color: color.palette.black}}
                  name={personagens.name}
                />
                <Text style={{color: color.palette.black, fontStyle: 'italic'}}>Clique para ver mais informações</Text>
              </View>
            )}
          />
      </Screen>
    </View>
  )
})
