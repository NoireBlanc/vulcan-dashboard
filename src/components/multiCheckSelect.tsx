import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 9 + ITEM_PADDING_TOP,
            width: 300,
        },
    },
};

export default function MultipleSelectCheckmarks({
    names,
    label,
    attr = '',
    chooseFilter = (message, attr) => {
        null;
    },
}) {
    const [personName, setPersonName] = React.useState<string[]>(names);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        let message = value;
        if (value.includes('all')) {
            if (value.length === names.length + 1) {
                message = [];
            } else {
                message = names;
            }
        }

        chooseFilter(message, attr);
        setPersonName(message);
    };

    return (
        <div style={{ margin: 5 }}>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="-multiple-checkbox-label">{label}</InputLabel>
                <Select
                    labelId="multiple-checkbox-label"
                    id="multiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label={label} />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    <MenuItem value="all">
                        <Checkbox checked={names.length > 0 && personName.length === names.length} size="small" />
                        <ListItemText primary="Select All" />
                    </MenuItem>
                    {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={personName.indexOf(name) > -1} size="small" />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
