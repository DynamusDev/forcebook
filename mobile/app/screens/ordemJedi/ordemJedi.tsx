import React, { FunctionComponent as Component, useState, useEffect } from "react"
import { FlatList, ScrollView, Platform, TextStyle, View, ViewStyle, Modal, YellowBox, TextInput, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { CommonButton, Header, Text, Screen, HeaderButton, Icon } from "../../components"
import { color, spacing } from "../../theme"
import Spinner from 'react-native-loading-spinner-overlay'
import AsyncStorage from "@react-native-community/async-storage"
import { api } from "../../services/api"

console.disableYellowBox = true;

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  alignItems: 'center',
  justifyContent: 'flex-start',
  flex: 1
}
const INPUT: TextStyle = {
  height: 45,
  fontFamily: 'Montserrat',
  width: '70%',
  borderRadius: 8,
  borderWidth: 0.4,
  borderColor: color.palette.black,
  color: color.palette.black,
  textAlign: 'center',
  fontSize: 18,
  marginTop: 12,
  backgroundColor: color.transparentChick
}
const PASSWORD: TextStyle = {
  height: 45,
  width: '80%',
  fontFamily: 'Montserrat',
  borderRadius: 8,
  textAlign: 'center',
  fontSize: 18,
  color: color.palette.black
}
const PASS: ViewStyle = {
  width: '50%',
  height: 45,
  flexDirection: 'row',
  borderRadius: 8,
  borderWidth: 0.4,
  borderColor: color.palette.black,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 12,
  marginBottom: 20,
  backgroundColor: color.transparentChick
}
const FOOTER: ViewStyle = { backgroundColor: color.palette.black, height: '20%',alignItems: 'center' }
const FOOTER_CONTENT: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 5,
}
const CENTEREDVIEW: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
const MODALVIEW: ViewStyle = {
  backgroundColor: color.palette.white,
  borderRadius: 10,
  borderWidth: 0.6,
  borderColor: color.palette.black,
  width: '90%',
  height: '70%',
  alignItems: "center",
  justifyContent: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5
}
const FORM: ViewStyle = {
  alignItems: "center",
  justifyContent: "center"
}
const PROP: TextStyle = {
  color: color.palette.black,
  fontSize: 20,
  marginLeft: 5,
  marginTop: 8,
  textAlign: 'center'
}
const BODY: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: "center",
  width: '100%'
}
const PERSONAGENSLIST: ViewStyle = {
  flex:1,
  maxHeight: '100%',
  width:'100%',
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
  height: '30%',
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
const FOOTERMODAL: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: 60
}
const REGISTER: ViewStyle = {
  width: '50%',
  height: 40,
  borderRadius: 8,
  backgroundColor: color.palette.black,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
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

export const OrdemJedi: Component = observer(function OrdemJedi() {
  const [usuarios, setUsuarios] = useState([])
  const [usuario, setUsuario] = useState([])
  const [spinner, setSpinner] = useState(false)
  const [message, setMessage] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [user, setUser] = useState([])
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [id, setId] = useState('')
  const [confirmUserPassword, setConfirmUserPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [showPassword, setShowPassword] = useState(true)
  const [icon, setIcon] = useState('eyeoff')
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    loadUsuarios()
    retrieveData()
  }, []);



  async function retrieveData() {
    try {
      const value = await AsyncStorage.getItem('id');
      if (value != null) {
        // We have data!!
        
        const response = await api.get(`users/${value}`)
        setId(response.data.id)
        setName(response.data.name)
        setTitle(response.data.title)
        setEmail(response.data.email)
        setPassword(response.data.password)
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  async function loadUsuario(usuarios) {
    setUsuario(usuarios)
    setModalVisible(true)
  }

  async function handleRegister(){
    if(password !== confirmUserPassword){
      setShowAlert(true)
      setMessage(`Oh Oh!!! As senhas não coincidem, por favor, revise-as e tente novamente`)
    } else if (name == '') {
      setShowAlert(true)
      setMessage(`Por favor, preencha o campo de "Nome"para continuarmos`)
    } else if (title == '') {
      setShowAlert(true)
      setMessage(`Por favor, preencha o campo de "Título" para continuarmos`)
    } else if (password == '') {
      setShowAlert(true)
      setMessage(`Por favor, escolha uma senha para continuarmos com o registro`)
    } else if (email == '') {
      setShowAlert(true)
      setMessage(`Por favor, informe um email para continuarmos com o registro`)
    } else {
      setSpinner(true)
      try {
        const response = await api.put(`/users/${id}`, {
          name,
          title,
          email,
          password
        })
        setSpinner(false)
        setShowAlert(true)
        setModalVisible(false)
        setMessage(`Boas notícias!!! Seu cadastro foi atualizado!!!`)
        
        const users = await api.get('users', {
          params:1
        });
    
        setUsuarios(users.data);
        setTotal(users.headers['x-total-count']);
        retrieveData()
      } catch (err) {
        setShowAlert(true)
        setMessage(err)
      }
    }
  }

  async function loadUsuarios() {

    if(loading) {
      return;
    }

    if(total > 0 && usuarios.length == total){
      return;
    }

    setLoading(true);

    const response = await api.get('users', {
      params:{page}
    });

    setUsuarios([...usuarios, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }

  function changeIcon() {
    setShowPassword(!showPassword)
    setIcon(icon === 'eye' ? 'eyeoff' : 'eye')
  }

  function logout() {
    AsyncStorage.clear();
    navigation.navigate('login');
  };

  return (
    <View style={FULL}>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        animation={'slide'}
        textStyle={{ color: '#FFF' }}
        overlayColor={'rgba(0,0,0,0.80)'}
      />
      <Screen style={CONTAINER} preset='fixed' backgroundColor={color.transparent}>
        <Header headerText='Ordem Jedi'
          leftIcon='logout' onLeftPress={() => { logout() }}
          rightIcon='profile' onRightPress={() => {setModalVisible(true)}}
          style={{ height: 55 }}
          titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
          background={color.palette.black}
        />
        <Modal
          visible={showAlert}
          transparent={true}
          animationType={"fade"}
          onRequestClose={ () => { setShowAlert(false) } } >
            <View style={ALERTCENTERED}>
              <View style={ALERTVIEW}>
                <Text style={ALERTTEXT}>{message}</Text>

                <CommonButton
                  name="Ok!"
                  background={color.palette.orangeDarker}
                  onPress={() => {
                    setShowAlert(false)
                  }}
                />
              </View>
            </View>
        </Modal>
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType={"slide"}
          onRequestClose={ () => { setModalVisible(false) } } >
            <View style={CENTEREDVIEW}>
              <View style={MODALVIEW}>
                <View style={HEADERMODAL}>
                  <View style={SEPARATE}/>
                  <Text style={ALERTTEXT}>Editar Informações</Text>
                  <HeaderButton name='close' onPress={() => { setModalVisible(false) }} />
                </View>
                <View style={BODY}>
                    <ScrollView
                      contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
                      showsVerticalScrollIndicator={false}
                    >
                      <Text style={PROP}>Nome</Text>
                      <TextInput style={{...INPUT, width: 250}}
                        placeholder="Your Jedi Name"
                        value={name}
                        onChangeText={setName}
                      />

                      <Text style={PROP}>Título Jedi</Text>
                      <TextInput style={{...INPUT, width: 250}}
                        value={title}
                        placeholder="Ex. Jedi Master"
                        onChangeText={setTitle}
                      />
                      <Text style={PROP}>Email</Text>
                      <TextInput style={{...INPUT, width: 250}}
                        keyboardType='email-address'
                        placeholder="yourname@email.com"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                      />

                      <Text style={PROP}>Senha</Text>
                      <View style={{...PASS, marginBottom:0, width: 250}}>
                        <View style={SEPARATE} />
                        <TextInput style={PASSWORD}
                          value={password}
                          autoCapitalize="none"
                          onChangeText={setPassword}
                          secureTextEntry={showPassword}
                        />
                        <TouchableOpacity style={SEPARATE} onPress={changeIcon}>
                          <Icon name={icon} style={{ height: 24, width: 24 }}/>
                        </TouchableOpacity>
                      </View>

                      <Text style={PROP}>Confirmar Senha</Text>
                      <View style={{...PASS, marginBottom:0, width: 250}}>
                        <View style={SEPARATE} />
                        <TextInput style={PASSWORD}
                          value={confirmUserPassword}
                          autoCapitalize="none"
                          onChangeText={setConfirmUserPassword}
                          secureTextEntry={showPassword}
                        />
                        <TouchableOpacity style={SEPARATE} onPress={changeIcon}>
                          <Icon name={icon} style={{ height: 24, width: 24 }}/>
                        </TouchableOpacity>
                      </View>
                      
                      <View style={FOOTERMODAL}>
                        <TouchableOpacity
                          style={REGISTER}
                          onPress={() => { handleRegister() }}
                        >
                          <Text style={{ color: '#fff', fontSize: 15 }}>Confirmar</Text>
                        </TouchableOpacity>
                      </View>
                      
                    </ScrollView>
                </View>
              </View>
            </View>
            {
              Platform.OS === 'ios' && <KeyboardAvoidingView behavior='padding'/>
            }
          </Modal>
        <FlatList
            data={ usuarios }
            style={PERSONAGENSLIST}
            contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
            showsVerticalScrollIndicator={false}
            keyExtractor={usuario => String(usuario.id)}
            onEndReached={loadUsuarios}
            onEndReachedThreshold={0.1}
            renderItem={({item:usuarios}) => (
              <View style={{alignItems: 'center', 
                            borderBottomWidth:0.5,
                            padding: 10,
                            borderBottomColor:'#444'}}>
                <Text style={{color: color.palette.black, fontWeight: 'bold', fontSize: 18 }}>{usuarios.name}</Text>
                <Text style={{color: color.palette.black, fontStyle: 'italic'}}>{usuarios.title}</Text>
                <Text style={{color: color.palette.black, fontStyle: 'italic'}}>{usuarios.email}</Text>
              </View>
            )}
          />
      </Screen>
    </View>
  )
})
