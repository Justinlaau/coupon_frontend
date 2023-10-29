import React from 'react';
import { Button } from '@rneui/themed';
import { useState } from 'react';
export const ButtonBox = (props:any) => {


    return (
        <Button title={props.text} titleStyle={props.textStyle}
            containerStyle={props.borderStyle}
            titleProps={props.textProps} 
            buttonStyle={props.size}
            type={props.boxType} onPress={props.action} color={props.color}
            loading={props.isLoading}
        />
    )
}

