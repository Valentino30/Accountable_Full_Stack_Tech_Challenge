import { useState } from "react";
import { View, TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "./styles";
import { MatchFilterType } from "../../types/match";
import DatePicker from "../DatePicker";

interface SearchBarWithFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  filterType: MatchFilterType;
  onFilterChange: (value: MatchFilterType) => void;
  date: Date | null;
  onDateChange: (date: Date | null) => void;
}

const SearchBarWithFilter = ({
  search,
  onSearchChange,
  filterType,
  onFilterChange,
  date,
  onDateChange,
}: SearchBarWithFilterProps) => {
  const [open, setOpen] = useState(false);

  const filters = [
    { label: "Country", value: "country" },
    { label: "Team", value: "team" },
  ];

  return (
    <View>
      <View style={styles.row}>
        <TextInput
          placeholder={`Search by ${filterType}`}
          value={search}
          onChangeText={onSearchChange}
          style={styles.searchInput}
        />

        <DropDownPicker
          open={open}
          items={filters}
          setOpen={setOpen}
          value={filterType}
          setValue={(callback) => {
            const newValue = typeof callback === "function" ? callback(filterType) : callback;
            if (newValue) onFilterChange(newValue as MatchFilterType);
          }}
          style={styles.dropdownStyle}
          containerStyle={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>

      <DatePicker value={date} onChange={onDateChange} />
    </View>
  );
};

export default SearchBarWithFilter;
