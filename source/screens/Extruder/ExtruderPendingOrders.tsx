import React, {memo, useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ExtrudersItems, {ExtrudersItemType} from './ExtrudersItems';
import {useNavigation} from '@react-navigation/native';
import {AppNavigationProp} from '../../stacks/StackTypes';
import {extruder_pending_orders} from '../../api/apis';
import {error} from '../../utils/ErrorHandler';
import {extruder_order_listing_response} from '../../api/ResponseTypes';
import EmptyList from '../../components/styles/EmptyList';

const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

const ExtruderPendingOrders = () => {
  const [list, setList] = useState<ExtrudersItemType[]>([]);
  const [loader, setLoader] = useState(false);

  const {navigate} = useNavigation<AppNavigationProp>();

  const getList = useCallback(async () => {
    try {
      setLoader(true);
      const response: {data: extruder_order_listing_response} =
        await extruder_pending_orders();
      setList(response?.data?.data);
      setLoader(false);
    } catch (err: any) {
      error(err);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    getList();
  }, [getList]);

  const onNavigateExtruderOrderHistory = useCallback(
    (data: ExtrudersItemType) => {
      navigate('ExtruderOrderHistory', {data: data});
    },
    [navigate],
  );

  const renderItemHandler = useCallback(
    ({item}: {item: ExtrudersItemType}) => {
      return (
        <ExtrudersItems onPress={onNavigateExtruderOrderHistory} data={item} />
      );
    },
    [onNavigateExtruderOrderHistory],
  );

  return (
    <View style={styles.root}>
      <FlatList
        data={list}
        renderItem={renderItemHandler}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
        keyExtractor={(_, index: number): string => index?.toString()}
        ListEmptyComponent={
          <EmptyList loader={loader} message="Not have any pending Orders!" />
        }
      />
    </View>
  );
};

export default memo(ExtruderPendingOrders);

const styles = StyleSheet.create({
  root: {flex: 1, paddingTop: 4},
  list: {
    flexGrow: 1,
    padding: 25,
    paddingBottom: 200,
  },
  itemSeparator: {
    height: 20,
  },
});
