import React from 'react';
import Select from 'react-select';
import flagEngland from "../assets/flags/england_icon.png";
import flagFrance from "../assets/flags/france_icon.png";
import flagGermany from "../assets/flags/germany_icon.png";
import flagItaly from "../assets/flags/italy_icon.png";

import "./styles/WelcomeComponent.css";

type OptionsProps = {
    value: string;
    label: string;
    flag: string;
};

type SelectOptionProps = {
    setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
};

const options: OptionsProps[] = [
    { value: 'français', label: 'Français', flag: flagFrance },
    { value: 'english', label: 'English', flag: flagEngland },
    { value: 'deutsch', label: 'Deutsch', flag: flagGermany },
    { value: 'italiano', label: 'Italiano', flag: flagItaly },
];

const WelcomeComponent = ({ setSelectedOption }: SelectOptionProps): JSX.Element => {

    const handleChange = (option: OptionsProps | null): void => {
        if (option) {
            setSelectedOption(option.value);
        }
    };

    const customOption = (props: any): JSX.Element => {
        const { innerRef, innerProps, data } = props;
        return (
            <div ref={innerRef} {...innerProps} className="custom-option">
                <img src={data.flag} alt={`${data.label} flag`} style={{ width: 20, marginRight: 10 }} />
                {data.label}
            </div>
        );
    };

    return (
        <div className="div-languages">
            
            <h1>Choisissez votre language :</h1>

            <Select
                options={options}
                onChange={handleChange}
                components={{ Option: customOption }}
                getOptionValue={(option) => option.value}
                className="react-select"
                classNamePrefix="select"
            />

        </div>
    );
};

export default WelcomeComponent;
