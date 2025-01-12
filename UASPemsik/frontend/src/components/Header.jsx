import React from "react";

const Header = ({Admin}) => {
    return(
        <div>
            <div className="flex bg-purple-600 justify-between items-center p-3 text-white">
                <h2 className="text-2xl font-bold">Welcome</h2>
                <div className="border border-gray-900 p-3 rounded-xl">
                    <p className="">Bayumas</p>
                </div>

            </div>
        </div>
    )
}

export default Header;