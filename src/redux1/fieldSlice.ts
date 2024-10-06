import { View, Text, Image } from 'react-native'
import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

export type FieldType = {
    id: String,
    icon?: Image | null,
    title: String,


}
export type FieldStateType = {
    field: FieldType,
    fields: FieldType[]
}

const initialState: FieldStateType = {
    field: {
        id:"",
        icon: null,
        title: "",
    },
    fields: []
}




export const fieldSlice = createSlice(
    {
        name: "Filed",
        initialState,
        reducers: {
            setField: (state, action) => {
                state.field = action.payload
            },
            setIcon: (state, action) => {
                state.field.icon = action.payload
            },
            setTitle: (state, action) => {
                state.field.title = action.payload
            },
            addFieldList: (state, action) => {
                state.fields.push(action.payload)
            }
        }
    }
)

export const { setIcon, setTitle, setField, addFieldList } = fieldSlice.actions;

export default fieldSlice.reducer;

