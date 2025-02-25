import {StyleSheet} from "react-native";
import {AppColors} from "../../theme/AppTheme";


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: "black"
    },
    title: {
        color: 'white',
        textAlign: 'center',
        marginTop: "6%",
        fontSize: 20,
        fontWeight: 'bold',
    },
    imageContainer: {
        alignSelf: 'center',
        marginTop: 130,
    },
    image: {
        width: 125,
        height: 125,
    },
    formContainer: {
        width: '95%',
        backgroundColor: "white",
        paddingVertical: 25,
        paddingHorizontal: 20,
        marginHorizontal: "auto",
        marginTop: 80,
        borderRadius: 10,
    },
    formTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        borderBottomWidth: 1,
        paddingBottom: 9,
    },
    formInputContainer: {
        marginBottom: 20
    },
    formInput: {
        borderColor: "#d8d8d8",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    buttonForm: {
        backgroundColor: AppColors.primary,
        paddingVertical: 9,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonFormText: {
        color: "#FFF",
        textAlign: "center",
        fontSize: 17,
    },
    redirectButton: {
        width: "100%",
    },
    redirectButtonText: {
        textAlign: "center",
        color: "darkorange",
        fontWeight: 'bold',
    }
});


export default styles;
