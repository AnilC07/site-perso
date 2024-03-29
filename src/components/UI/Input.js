// import useCtx from "../../hook/useCtx";
import classes from "./Input.module.css";

const Input = ({ placeholder, type, label, id, name }) => {
  // const context = useCtx();

  // console.log(typeof label)
  // const onChangeHandler = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;

  // //   context.setFormulaire(name, value);
  // //   // console.log(context.formulaire)
  // };

  // // useEffect(() => {
  // //   console.log("formulaire", context.formulaire);
  // // }, [context.formulaire]);

  return (
    <div className={classes.input}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        name={name}
        required
      />
    </div>
  );
};

export default Input;
