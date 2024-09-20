import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import ReactNativeModal from 'react-native-modal';

const SelectLangModal = ({visible, onClose, onSelect, selectedLang}) => {
  const [languages, setLanguages] = useState([
    {
      title: 'English',
    },
    {
      title: 'ਪੰਜਾਬੀ',
    },
    {
      title: 'தமிழ்',
    },
    {
      title: 'हिंदी',
    },
  ]);
  const getSelected = () => {
    let i = 0;
    languages.map((item, index) => {
      if (item.title == selectedLang) {
        i = index;
      }
    });
    return i;
  };
  const [selectedIndex, setSelectedIndex] = useState(getSelected());

  return (
    <ReactNativeModal
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      onBackdropPress={() => onClose()}
      isVisible={visible}
      style={styles.modalView}>
      <View style={styles.modal}>
        <Text style={styles.heading}>Select Language</Text>
        <FlatList
          data={languages}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  setSelectedIndex(index);
                  onSelect(languages[index].title);
                }}>
                <Image
                  source={
                    selectedIndex == index
                      ? require('../images/radio.png')
                      : require('../images/radio-button.png')
                  }
                  style={styles.icon}
                />
                <Text style={styles.itemTxt}>{item.title}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </ReactNativeModal>
  );
};

export default SelectLangModal;
const styles = StyleSheet.create({
  modalView: {
    margin: 0,
  },
  icon: {
    width: 18,
    height: 18,
  },
  modal: {
    width: '100%',
    paddingBottom: 20,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    margin: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    height: 50,
    borderWidth: 0.5,
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 8,
  },
  itemTxt: {
    marginLeft: 10,
  },
});
