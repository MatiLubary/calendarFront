import { useSelector, useDispatch } from "react-redux"
import { onOpenDateModal, onCloseDateModal } from "../store/ui/uiSlice";


export const useUiStore = () => {

    const dispatch = useDispatch();


    const {isDateModalOpen} = useSelector(state => state.ui);

    const openDateModal = () => {
        dispatch(onOpenDateModal())
    }

    const closeDateModal = () => {
        dispatch(onCloseDateModal())
    }

    const toggleDateModal = () => {
        (isDateModalOpen) ? openDateModal() :  closeDateModal;
    }


    return {
        // properties
        isDateModalOpen,
        // methods
        openDateModal,
        closeDateModal,
        toggleDateModal,
    }

}