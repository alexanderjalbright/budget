import styles from './Button.module.css'

function Button(props){
    return <button className={`${styles.button} p-2 m-2 text-center`} {...props}/>
}

export default Button;