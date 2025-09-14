import { useState } from "react";
import { View, TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "./styles";
import { MatchFilterType } from "../../types/match";

interface SearchBarWithFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  filterType: MatchFilterType;
  onFilterChange: (value: MatchFilterType) => void;
}

const SearchBarWithFilter = ({ search, onSearchChange, filterType, onFilterChange }: SearchBarWithFilterProps) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput placeholder="Search..." value={search} onChangeText={onSearchChange} style={styles.searchInput} />

      <DropDownPicker
        open={open}
        value={filterType}
        items={[
          { label: "Country", value: "country" },
          { label: "Team", value: "team" },
          { label: "Date", value: "date" },
        ]}
        setOpen={setOpen}
        setValue={(callback) => {
          const newValue = typeof callback === "function" ? callback(filterType) : callback;
          if (newValue) {
            onFilterChange(newValue as MatchFilterType);
          }
        }}
        containerStyle={styles.dropdown}
        style={styles.dropdownStyle}
        dropDownContainerStyle={styles.dropdownContainer}
      />
    </View>
  );
};

export default SearchBarWithFilter;
