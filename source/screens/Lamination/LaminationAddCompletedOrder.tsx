import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import React, {memo, useCallback, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {lamination_set_order_complete_body} from '../../api/BodyTypes';
import {lamination_complete_orders_response} from '../../api/ResponseTypes';
import {lamination_set_order_complete} from '../../api/apis';
import {images} from '../../assets/images';
import {Font500, Font700} from '../../components/fonts/Fonts';
import Button from '../../components/styles/Button';
import CommonHeader from '../../components/styles/CommonHeader';
import DropDown, {
  DropDownRef,
  DropDownType,
} from '../../components/styles/DropDown';
import Input, {InputRef} from '../../components/styles/Input';
import {colors} from '../../constants/colors';
import {fontFamily} from '../../constants/fontFamily';
import {AppNavigationProp, AppStackParamList} from '../../stacks/StackTypes';
import {checkInput} from '../../utils/CheckInput';
import {error, ShowToast} from '../../utils/ErrorHandler';

type LaminationAddCompletedOrderRouteProp = RouteProp<
  AppStackParamList,
  'LaminationAddCompletedOrder'
>;

const machineListing: DropDownType[] = [
  {title: 'Machine 1', value: 'machine_1'},
  {title: 'Machine 2', value: 'machine_2'},
  {title: 'Machine 3', value: 'machine_3'},
  {title: 'Machine 4', value: 'machine_4'},
  {title: 'Machine 5', value: 'machine_5'},
];

const LaminationAddCompletedOrder = () => {
  const route = useRoute<LaminationAddCompletedOrderRouteProp>();
  const route_data = route?.params?.data;

  const {goBack} = useNavigation<AppNavigationProp>();

  const ItemData = route?.params?.data;

  const [loader, setLoader] = useState<boolean>(false);

  const machine = useRef<DropDownRef>(null);
  const date = useRef<InputRef>(null);
  const meter = useRef<InputRef>(null);

  const onCompleteOrderHandler = useCallback(async () => {
    if (checkInput(meter?.current?.get(), 'Meter Require for complete order')) {
      return;
    }
    if (
      checkInput(
        machine?.current?.get()?.value,
        'Please Select Machine, Machine is Require for complete order',
      )
    ) {
      return;
    }

    const body: lamination_set_order_complete_body = {
      lamination_production_order_id: ItemData?.production_order_id,
      machine: machine?.current?.get()?.value,
      date: date?.current?.get(),
      meter: meter?.current?.get(),
    };

    try {
      setLoader(true);
      const response: {data: lamination_complete_orders_response} =
        await lamination_set_order_complete(body);
      ShowToast(response?.data?.message);
      setLoader(false);
      goBack();
    } catch (err) {
      setLoader(false);
      error(err);
    } finally {
      setLoader(false);
    }
  }, [ItemData, goBack]);

  return (
    <View style={styles.root}>
      <CommonHeader title="Lamination Orders" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollRoot}>
        <View style={styles.container}>
          <Font500 style={styles.orderId}>
            {'#' + ItemData.production_order_id}
          </Font500>
          <View style={styles.detail}>
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Lamination Type : '}</Font500>
                <Font700 style={styles.value}>
                  {route_data?.lamination_type}
                </Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Paper Name : '}</Font500>
                <Font700 style={styles.value}>
                  {route_data?.lamination_material_name}
                </Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'GSM : '}</Font500>
                <Font700 style={styles.value}>{route_data?.gsm}</Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Width : '}</Font500>
                <Font700 style={styles.value}>{route_data?.width}</Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Meter : '}</Font500>
                <Font700 style={styles.value}>{route_data?.meter}</Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Paper KG : '}</Font500>
                <Font700 style={styles.value}>
                  {Number(route_data?.paper_kg)?.toFixed(2)}
                </Font700>
              </View>
            </View>
          </View>
          <DropDown
            ref={machine}
            rootStyle={styles.inputContainer}
            data={machineListing}
            label="Machine"
          />
          <Input
            ref={date}
            default_value={moment().format('DD-MM-YYYY')}
            rootStyle={styles.inputContainer}
            label="Date (DD-MM-YYYY)"
            config={{editable: false}}
          />
          <Input
            ref={meter}
            config={{placeholder: '100 Meter'}}
            rootStyle={styles.inputContainer}
            label="Meter"
          />
          {/* <Font500 style={styles.pending_qty}>
            {'pending quantity : ' + route_data?.production_qty}
          </Font500> */}
        </View>
        <Button
          loader={loader}
          onPress={onCompleteOrderHandler}
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

export default memo(LaminationAddCompletedOrder);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollRoot: {
    flexGrow: 1,
    paddingBottom: 100,
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
  pending_qty: {
    fontSize: 12,
    paddingTop: 10,
    color: colors.darkGray,
  },
});
