import Image from 'next/image';
import React from 'react';

type AvatarCell = {
	src: string;
};

const AvatarCell = (props: AvatarCell) => {
	const { src } = props;
	return (
		<div className="w-[30px] h-[30px] overflow-hidden rounded">
			<Image className="object-cover" width={100} height={100} src={src} alt="avatar" />
		</div>
	);
};

export default AvatarCell;
