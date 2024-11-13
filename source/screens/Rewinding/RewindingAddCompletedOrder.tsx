import {RouteProp, useRoute} from '@react-navigation/native';
import React, {memo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {images} from '../../assets/images';
import {Font500, Font700} from '../../components/fonts/Fonts';
import Button from '../../components/styles/Button';
import CommonHeader from '../../components/styles/CommonHeader';
import Input from '../../components/styles/Input';
import {colors} from '../../constants/colors';
import {fontFamily} from '../../constants/fontFamily';
import {AppStackParamList} from '../../stacks/StackTypes';

type RewindingAddCompletedOrderRouteProp = RouteProp<
  AppStackParamList,
  'RewindingAddCompletedOrder'
>;

const RewindingAddCompletedOrder = () => {
  const route = useRoute<RewindingAddCompletedOrderRouteProp>();

  const ItemData = route?.params?.data;
  return (
    <View style={styles.root}>
      <CommonHeader title="Rewinding Orders" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollRoot}>
        <View style={styles.container}>
          <Font500 style={styles.orderId}>{ItemData.order_id}</Font500>
          <View style={styles.detail}>
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Gauge : '}</Font500>
                <Font700 style={styles.value}>{ItemData?.length}</Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Size : '}</Font500>
                <Font700 style={styles.value}>{ItemData?.width + '"'}</Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Colors : '}</Font500>
                <Font700 style={styles.value}>{ItemData?.color}</Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Qty : '}</Font500>
                <Font700 style={styles.value}>
                  {ItemData?.production_qty + ' Rolls'}
                </Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Pipe : '}</Font500>
                <Font700 style={styles.value}>
                  {ItemData?.pipe_size + 'MM'}
                </Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Sticker : '}</Font500>
                <Font700 style={styles.value}>{'Yes'}</Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Length : '}</Font500>
                <Font700 style={styles.value}>
                  {ItemData?.length + ' MM'}
                </Font700>
              </View>
            </View>
          </View>
          <Input
            config={{placeholder: 'Contractor'}}
            rootStyle={styles.inputContainer}
            label="Contractor"
          />
          <Input
            config={{placeholder: '09/05/2024'}}
            rootStyle={styles.inputContainer}
            label="Date"
          />
          <Input
            config={{placeholder: '2'}}
            rootStyle={styles.inputContainer}
            label="Rolls"
          />
          <Input
            config={{placeholder: 'Remarks'}}
            rootStyle={styles.inputContainer}
            label="Remarks"
          />
        </View>
        <Button
          icon={images.complete}
          iconStyle={styles.buttonIcon}
          buttonTextStyle={styles.buttonText}
          buttonContainerStyle={styles.button}>
          {'Make it Complete'}
        </Button>
      </ScrollView>
    </View>
  );
};

export default memo(RewindingAddCompletedOrder);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollRoot: {
    flexGrow: 1,
  },
  container: {
    padding: 17,
    marginTop: 32,
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 24,
    borderColor: colors.color_D5E4E3,
    backgroundColor: colors.color_F4F8F7,
  },
  orderId: {
    fontSize: 18,
  },
  detail: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 3,
    marginTop: 23,
  },
  detailContainer: {
    flexDirection: 'row',
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  detailSubContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  label: {
    fontSize: 14,
    color: colors.color_777777,
  },
  value: {fontSize: 14, color: colors.color_0B2624},
  line: {
    height: 1,
    backgroundColor: colors.color_E8DBDF,
  },
  inputContainer: {
    marginTop: 16,
  },
  infoIcon: {
    height: 28,
    width: 28,
  },
  unitContainer: {
    marginTop: 33,
    flexDirection: 'row',
  },
  unitInput: {
    flex: 1,
  },
  button: {
    marginVertical: 46,
    marginHorizontal: 24,
  },
  buttonIcon: {height: 28, width: 28},
  buttonText: {
    fontSize: 16,
    paddingHorizontal: 6,
    fontFamily: fontFamily.Font500,
  },
});