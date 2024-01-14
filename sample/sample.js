import AutoComplete from "autcomplete-react-minimalist";
import countries from "./countries.json"

const MyComponent = () => {
  return (
    <AutoComplete
      inputKey="my-autocomplete"
      placeholder="Type to search..."
      listToFilter={countries}
      modifierClass=""
      isRestrictedToOption={true}
      onChange={(value) => console.log(value)}
    />
  );
};
