import { Text, View } from '../components/Themed';
import React, {Component, useState} from 'react';
import {Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataTable from 'react-data-table-component';


const columns = [
    {
        name: 'Date',
        selector: (row: { date: any; }) => row.date,
    },
    {
        name: 'Percentage',
        selector: (row: { percentage: any; }) => row.percentage,
    },
];

function MyComponent() {
  const [calendarData, setCalendarData] = useState(null);

    return (<>
        <DataTable
            columns={columns}
            data={calendarData}
            selectableRows
        />
        <Pressable
          onPress = { () => {
            AsysncStorage.getAllKeys().then((Keys) => {
              AsyncStorage.multiGet(Keys).then((value) => {
                var result = [];
                Keys.forEach((key, i) => {
                  result.push({
                    id: i,
                    date:key,
                    percentage: value[i],
                  });
                });
                setCalendarData(result);
              });
            });
          }}
        />
        </>
    );
};

