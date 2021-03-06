import React from 'react';
import T from 'prop-types';
import { TouchableOpacity, ViewPropTypes, View } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import R from 'ramda';
import Input from '../Input';
import Text from '../Text';
import s from './styles';
import { colors, dimensions } from '../../styles';


const getOptionText = (option, keyToRender) =>
  (R.is(String, option) ? option : R.propOr('', keyToRender, option));

const getOptionStyle = (isSelected, defaultValue, text) => {
  if (isSelected && isSelected === text) {
    return s.selectedOption;
  } else if (!isSelected && defaultValue && defaultValue === text) {
    return s.selectedOption;
  }
  return null;
};

const renderRow = (height, keyToRender, isSelected, defaultValue) => (option) => {
  const text = getOptionText(option, keyToRender);
  const style = getOptionStyle(isSelected, defaultValue, text);

  return (
    <TouchableOpacity style={[s.option, { height }, style]}>
      <Text style={s.optionText}>{text}</Text>
    </TouchableOpacity>
  );
};

const renderIcon = (icon, isDropped) => {
  if (icon) {
    if (isDropped) {
      return {
        ...icon,
        color: colors.grey,
      };
    }
    return icon;
  }
  return null;
};

const renderSeparator = () => null;

const Select = (props) => {
  const {
    isDropped,
    maxOptionsToDisplay,
    onDropped,
    onSelect,
    onSetOptionWidth,
    optionHeight,
    selectorsWidth,
    options,
    keyToRender,
    placeholder,
    disabledPlaceholder,
    style,
    defaultValue,
    isSelected,
    icon,
    label,
    labelStyle,
    disabled = false,
  } = props;

  return (
    <View>
      {!!label && <Text style={[s.label, labelStyle]}>{label}</Text>}
      <ModalDropdown
        disabled={disabled}
        dropdownStyle={[
          s.select,
          {
            height: optionHeight * R.min(
              options.length, maxOptionsToDisplay,
            ),
            width: selectorsWidth,
          },
        ]}
        onDropdownWillHide={onDropped}
        onDropdownWillShow={onDropped}
        onLayout={onSetOptionWidth}
        onSelect={onSelect}
        options={options}
        renderRow={
          renderRow(optionHeight, keyToRender, isSelected, defaultValue)
        }
        renderSeparator={renderSeparator}
      >
        <Input
          editable={false}
          containerStyle={style}
          secondContainerStyle={[s.secondInputContainer, disabled && {
            backgroundColor: colors.grey,
          }, isSelected && s.selectedSecondInputContainer]}
          style={[s.inputStyle, isSelected && s.selectedInputStile]}
          isValid
          icon={renderIcon(icon, isDropped)}
          iconRight={{
            name: isDropped ? 'keyboard-arrow-up' : 'keyboard-arrow-down',
            size: dimensions.iconSize - 4,
            color: isSelected ? colors.green : colors.grey,
          }}
          rightIconStyle={s.rightIconStyle}
          multiline={false}
          pointerEvents="none"
          value={
            getOptionText(
              isSelected || defaultValue,
              keyToRender,
            )
          }
          placeholder={disabled ? disabledPlaceholder : placeholder}
          placeholderColor={disabled ? colors.green : null}
        />
      </ModalDropdown>
    </View>
  );
};

Select.propTypes = {
  isDropped: T.bool,
  maxOptionsToDisplay: T.number,
  onDropped: T.func,
  onSelect: T.func,
  onSetOptionWidth: T.func,
  optionHeight: T.number,
  selectorsWidth: T.number,
  options: T.array,
  placeholder: T.string,
  disabledPlaceholder: T.string,
  style: ViewPropTypes.style,
  defaultValue: T.oneOfType([T.string, T.object]),
  isSelected: T.any,
  keyToRender: T.string,
  icon: T.object,
  label: T.string,
  labelStyle: Text.propTypes.style,
  disabled: T.bool,
};

export default Select;
