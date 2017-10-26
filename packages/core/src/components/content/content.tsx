import { Component, Element, Prop } from '@stencil/core';
import { Config, Scroll, ScrollDetail } from '../../index';
import { createThemedClasses, getElementClassObject } from '../../utils/theme';
import { getParentElement, getToolbarHeight } from '../../utils/helpers';


@Component({
  tag: 'ion-content',
  styleUrls: {
    ios: 'content.ios.scss',
    md: 'content.md.scss',
    wp: 'content.wp.scss'
  }
})
export class Content {
  private mode: string;
  private color: string;
  @Element() private el: HTMLElement;
  @Prop({ context: 'config' }) config: Config;

  $scroll: Scroll;
  $scrollDetail: ScrollDetail = {};
  $fixed: HTMLElement;
  $siblingHeader: HTMLElement;
  $siblingFooter: HTMLElement;

  headerHeight: string;


  protected ionViewDidUnload() {
    this.$fixed = this.$scroll = this.$siblingFooter = this.$siblingHeader = this.$scrollDetail = null;
  }

  enableJsScroll() {
    this.$scroll.jsScroll = true;
  }

  /**
   * Scroll to the top of the content component.
   *
   * @param {number} [duration]  Duration of the scroll animation in milliseconds. Defaults to `300`.
   * @returns {Promise} Returns a promise which is resolved when the scroll has completed.
   */
  scrollToTop(duration: number = 300) {
    return this.$scroll.scrollToTop(duration);
  }

  /**
   * Scroll to the bottom of the content component.
   *
   * @param {number} [duration]  Duration of the scroll animation in milliseconds. Defaults to `300`.
   * @returns {Promise} Returns a promise which is resolved when the scroll has completed.
   */
  scrollToBottom(duration: number = 300) {
    return this.$scroll.scrollToBottom(duration);
  }

  /**
   * @input {boolean} If true, the content will scroll behind the headers
   * and footers. This effect can easily be seen by setting the toolbar
   * to transparent.
   */
  @Prop() fullscreen: boolean = false;


  protected render() {
    const scrollStyle: any = {};

    const pageChildren: HTMLElement[] = getParentElement(this.el).children;
    const headerHeight = getToolbarHeight('ION-HEADER', pageChildren, this.mode, '44px', '56px');
    const footerHeight = getToolbarHeight('ION-FOOTER', pageChildren, this.mode, '50px', '48px');

    if (this.fullscreen) {
      scrollStyle.paddingTop = headerHeight;
      scrollStyle.paddingBottom = footerHeight;
    } else {
      scrollStyle.marginTop = headerHeight;
      scrollStyle.marginBottom = footerHeight;
    }

    const themedClasses = createThemedClasses(this.mode, this.color, 'content');
    const hostClasses = getElementClassObject(this.el.classList);

    const scrollClasses = {
      ...themedClasses,
      ...hostClasses,
      'statusbar-padding': this.config.getBoolean('statusbarPadding')
    };

    return (
      <ion-scroll style={scrollStyle} class={scrollClasses}>
        <slot></slot>
      </ion-scroll>
    );
  }
}