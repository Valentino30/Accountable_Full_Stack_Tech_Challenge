import { useEffect, useState } from 'react'
import { Modal, Platform, Text, TouchableOpacity, View } from 'react-native'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { opacities } from '../../styles/theme'
import styles from './styles'

interface DatePickerProps {
  value?: Date | null
  onChange: (date: Date | null) => void
}

export default function DatePicker({
  value = null,
  onChange,
}: DatePickerProps) {
  const [visible, setVisible] = useState(false)
  const [tempDate, setTempDate] = useState<Date | null>(value ?? null)

  useEffect(() => {
    setTempDate(value ?? null)
  }, [value])

  const openPicker = () => {
    setTempDate(value ?? new Date())
    setVisible(true)
  }

  const handleChange = (_event: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS === 'android') {
      if (!_event || _event.type === 'dismissed') {
        setVisible(false)
        return
      }
      if (selected) {
        setVisible(false)
        onChange(selected)
      }
    } else {
      if (selected) setTempDate(selected)
    }
  }

  const onConfirm = () => {
    onChange(tempDate)
    setVisible(false)
  }

  const onCancel = () => {
    setTempDate(value ?? null)
    setVisible(false)
  }

  const onClear = () => {
    setTempDate(null)
    setVisible(false)
    onChange(null)
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TouchableOpacity
          style={[styles.inputWrapper, styles.input]}
          onPress={openPicker}
          activeOpacity={opacities.active}
        >
          <Text style={styles.inputText}>
            {value ? value.toDateString() : 'Choose a date'}
          </Text>
        </TouchableOpacity>

        {value && (
          <TouchableOpacity onPress={onClear} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>×</Text>
          </TouchableOpacity>
        )}
      </View>

      {visible && Platform.OS !== 'ios' && (
        <DateTimePicker
          value={value ?? new Date()}
          mode="date"
          display="default"
          onChange={handleChange}
        />
      )}

      {visible && Platform.OS === 'ios' && (
        <Modal transparent animationType="slide" visible={visible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <DateTimePicker
                value={tempDate ?? new Date()}
                mode="date"
                display="spinner"
                onChange={handleChange}
                style={styles.modalPicker}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={onCancel} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={onConfirm}
                  style={[styles.modalButton, styles.modalPrimaryButton]}
                >
                  <Text
                    style={[
                      styles.modalButtonText,
                      styles.modalPrimaryButtonText,
                    ]}
                  >
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  )
}
