import React from "react";
export function Sheet({open,children}){return open?children:null}
export function SheetContent({children,className=""}){return <div className={"fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto bg-ink p-6 shadow-2xl "+className}>{children}</div>}
export function SheetHeader({children}){return <div className="mb-6">{children}</div>}
export function SheetTitle({children}){return <h2 className="text-xl">{children}</h2>}
