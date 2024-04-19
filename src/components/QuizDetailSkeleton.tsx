import React, { FC } from 'react';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const QuizDetailSkeleton: FC = () => {
  return (
    <>
      <SkeletonPlaceholder borderRadius={10}>
        <SkeletonPlaceholder.Item paddingHorizontal={24} paddingVertical={20} gap={20}>
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonPlaceholder.Item key={index} height={240} />
          ))}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </>
  );
};

export default QuizDetailSkeleton;
