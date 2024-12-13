//import "/node_modules/flag-icons/css/flag-icons.min.css";
import "./styles/WelcomeComponent.css";

type SelectOptionProps = {
    selectedOption: string;
    setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
};

const WelcomeComponent = ({ selectedOption, setSelectedOption }: SelectOptionProps): JSX.Element => {

    //const [open, setOpen] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setSelectedOption(event.target.value);
    };
    
    /* const handleChange = (value: string) => {
        setSelectedOption(value);
        setOpen(false);
    }; */

    return (
        <div className="div-languages">

            <h1>! Bienvenue dans mon ecopot game !</h1>

            {/* <div className="custom-select" onClick={() => setOpen(!open)}>
                {selectedOption || "-- Choisissez votre langue : --"}
            </div>
            {open && (
                <ul className="options">
                    <li onClick={() => handleChange("français")}>
                        <span className="fi fi-fr"></span> Français
                    </li>
                    <li onClick={() => handleChange("english")}>
                        <span className="fi fi-us"></span> English
                    </li>
                    <li onClick={() => handleChange("deutsch")}>
                        <span className="fi fi-de"></span> Deutsch
                    </li>
                    <li onClick={() => handleChange("italiano")}>
                        <span className="fi fi-it"></span> Italiano
                    </li>
                </ul>
            )} */}

            <select id="options" value={selectedOption} onChange={handleChange}>
                <option value="">-- Choisissez votre langue : --</option>
                <option value="français">Français</option>
                <option value="english">English</option>
                <option value="deutsch">Deutsch</option>
                <option value="italiano">Italiano</option>
            </select>
            
            {selectedOption && <p>{selectedOption === "français" ? "Vous avez choisi: " 
                : selectedOption === "english" ? "You selected: " 
                : selectedOption === "deutsch" ? "Sie haben gewählt: " 
                : "Avete scelto: "} {selectedOption}</p>}

        </div>
    )
}
export default WelcomeComponent;