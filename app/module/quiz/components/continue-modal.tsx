import Modal from "@/components/ui/modal";

interface Props {
    open: boolean;
    onClose: () => void;
    onOk: () => void;
    onExit: () => void;
}

const ContinueModal = ({ open, onClose, onOk, onExit }: Props) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            onOk={onOk}
            title="Continue Quiz?"
            okText="Continue"
            cancelText="Restart"
            onExit={onExit}
        >
            You have already participated in this quiz with this email. Would
            you like to continue?
        </Modal>
    );
};

export default ContinueModal;
