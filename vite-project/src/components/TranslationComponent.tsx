import React from 'react';
import Select from 'react-select';
import flagEngland from "../assets/flags/england_icon.png";
import flagFrance from "../assets/flags/france_icon.png";
import flagGermany from "../assets/flags/germany_icon.png";
import flagItaly from "../assets/flags/italy_icon.png";
import "./styles/TranslationComponent.css";

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
            <div ref={innerRef} {...innerProps} className='custom-option'>
                <img src={data.flag} alt={`${data.label} flag`} style={{ width: 25, paddingRight: 10, paddingLeft: 10 }} />
                {data.label.slice(0, 2)}
            </div>
        );
    };

    const customSingleValue = (props: any): JSX.Element => {
        const { data } = props;
        return (
            <div className='main-flag'>
                <img src={data.flag} alt={`${data.label} flag`} className='flag' />
            </div>
        );
    }

    return (
        <div className="div-languages">

            <h1>Choisir une langue: </h1>

            <Select
                unstyled
                styles={{
                    control: (base) => ({
                        ...base,
                        border: "none",
                        background: "#277a6dbf",
                        padding: "4px",
                    }),
                }}
                options={options}
                onChange={handleChange}
                components={{ Option: customOption, SingleValue: customSingleValue }}
                getOptionValue={(option) => option.value}
                value={options[0]}
                classNamePrefix="select"
            />

        </div>
    );
};

export default WelcomeComponent;
