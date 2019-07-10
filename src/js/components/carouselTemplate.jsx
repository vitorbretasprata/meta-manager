import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap';

const items = [
  {
    src: "slide-1",
    titleSlide: 'Organization',
    descriptionSlide: 'This application permits that not only you create a ticket, but set their status and priority. If you have an enterprise account, you can set who will be the owner of the ticket.',
    className: 'Slide applicationSlide'
  },
  {
    src: "slide-2",
    titleSlide: 'User account',
    descriptionSlide: 'To user, just create your account, every tickets that you create will only appear to you.',
    className: 'Slide userSlide'
  },
  {
    src: "slide-3",
    titleSlide: 'Enterprise account',
    descriptionSlide: `If you have a caompany, you can also create a enterprise account.
    With that, you can create and manager users account.
    Every tickets that you or your users create, will only appear to you and the accounts that you created.`,
    className: 'Slide enterpriseSlide'
  }
];

class CarouselTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
            className="customSlide"
            onExiting={this.onExiting}
            onExited={this.onExited}
            key={item.src}
        >
            <section className={item.className}>
                <div className="content-slide">                    
                    <div className="title-slide">
                        <h3>{item.titleSlide}</h3>
                    </div>
                    <div className="description-slide">
                        {item.descriptionSlide}
                    </div>
                </div>  
            </section>
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}


export default CarouselTemplate;
