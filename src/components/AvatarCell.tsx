import React from 'react';
type AvatarCell = {
	src: string;
};
const AvatarCell = (props: AvatarCell) => {
	const { src } = props;
	return (
			<div className="w-[30px] h-[30px] overflow-hidden rounded">
				<img className="object-cover" src={src} alt="avatar" />
			</div>
	);
};

export default AvatarCell;
