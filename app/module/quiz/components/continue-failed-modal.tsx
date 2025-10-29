import Modal from "@/components/ui/modal";

interface Props {
    open: boolean;
    onClose: () => void;
    onExit?: () => void;
}

const ContinueFailedModal = ({ open, onClose, onExit }: Props) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            title="No Account?"
            onExit={onExit}
        >
            There is no account associated with this email. Please start a new
            quiz.
        </Modal>
    );
};

export default ContinueFailedModal;
