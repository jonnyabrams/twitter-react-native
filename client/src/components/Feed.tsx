import { FlatList, StyleSheet, View } from 'react-native'

import tweets from '../dummyData'
import Tweet from './Tweet'

const Feed = () => {
  return (
    <View style={{width: '100%'}}>
      <FlatList
        data={tweets}
        renderItem={({item}) => <Tweet tweet={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

export default Feed

const styles = StyleSheet.create({})