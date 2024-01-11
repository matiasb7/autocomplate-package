import AutoComplete from "autcomplete-react";

const options = [
  { label: "Afghanistan", key: "AF" },
  { label: "Åland Islands", key: "AX" },
  { label: "Albania", key: "AL" },
  { label: "Algeria", key: "DZ" },
  { label: "American Samoa", key: "AS" },
  { label: "Andorra", key: "AD" },
];
const MyComponent = () => {
  return (
    <AutoComplete
      inputKey="my-autocomplete"
      placeholder="Type to search..."
      listToFilter={options}
      modifierClass=""
      isRestrictedToOption={true}
      onChange={(value) => console.log(value)}
    />
  );
};
