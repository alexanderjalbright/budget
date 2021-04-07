import styles from './Button.module.css'

function Button(props){
    return <button className={`${styles.button} ${props.class}`} {...props}/>
}

export default Button;