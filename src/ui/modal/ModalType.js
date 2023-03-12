import React from "react";

export type ModalType = {
    open: boolean;
    onCLose: () => void;
    child: React.ReactNode | null;
}