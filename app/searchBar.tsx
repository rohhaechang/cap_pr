import React, { useState } from 'react';
import { ItemType } from './page';

interface Props {
  item: ItemType;
}

export default function SearchBar({ item }: Props) {
  const [query, setQuery] = useState<string>('');


  const relatedSearches: string[] = []

  return (
    <div>

    </div>
  )
}
