import React from 'react'

export const PodcastSection = () => {
  return (
    <section className="podcastsection" id="podcastsection">
      <div className="container">
        <div className="row">
          <div className="sectionHeader">
            <h2 className="sectionHeaderTitle">Podcast موجة حب</h2>
            <p className="sectionHeaderDetails">موجات حب.. اليكم مباشرة</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <iframe
              width="100%"
              height="350"
              scrolling="no"
              frameBorder="0"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/1176891079&amp;"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
