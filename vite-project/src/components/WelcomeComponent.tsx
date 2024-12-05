import "./styles/WelcomeComponent.css";

type SelectOptionProps = {
    selectedOption: string;
    setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
};

const WelcomeComponent = ({ selectedOption, setSelectedOption }: SelectOptionProps): JSX.Element => {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setSelectedOption(event.target.value);
    };
    
    return (
        <div className="div-languages">

            <h1>! Bienvenue dans mon ecopot game !</h1>

            <label htmlFor="options">Choisissez votre language :</label>

            <select id="options" value={selectedOption} onChange={handleChange}>
                <option value="">--Please choose an option--</option>
                <option value="français">Français</option>
                <option value="english">English</option>
                <option value="deutsch">Deutsch</option>
                <option value="italiano">Italiano</option>
            </select>
            
            {selectedOption && <p>{selectedOption === "français" ? "Vous avez choisi:" 
                : selectedOption === "english" ? "You selected:" 
                : selectedOption === "deutsch" ? "Sie haben gewählt:" 
                : "Avete scelto:"} {selectedOption}</p>}

        </div>
    )
}
export default WelcomeComponent;