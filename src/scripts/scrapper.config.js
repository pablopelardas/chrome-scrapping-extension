export const selectors = {
    main:{
        profileImage: '.pv-top-card-profile-picture__image',
        contactInfoA: '#top-card-text-details-contact-info',
        contactInfoS: '.pv-profile-section__section-info',
        generalContainer: idRef => `#${idRef} ~ .pvs-list__outer-container > ul > li > div`,
        descriptions: '.pv-shared-text-with-see-more',
    }
};