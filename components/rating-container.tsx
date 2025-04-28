import { getRatingById } from '@/utils/services/doctor';
import React from 'react'
import RatingChart from './charts/rating-chart';
import RatingList from './rating-list';

const RatingContainer =async ({ id }: { id: string }) => {
  const { ratings, totalRatings, averageRating } = await getRatingById(id);
  return (
    <div className="space-y-4">
    <RatingChart
      totalRatings={totalRatings!}
      averageRating={Number(averageRating!)}
    />
    <RatingList data={ratings!} />
  </div>
  )
}

export default RatingContainer