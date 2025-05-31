// src/components/sections/AboutMeSection.tsx
"use client";

import React from 'react';
import { useTranslation } from '@/i18n/client';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion'; // Import motion from framer-motion

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};



const AboutMeSection: React.FC = () => {
  const pathname = usePathname();
  const lng = pathname.split('/')[1];
  const { t } = useTranslation(lng, 'aboutMe');

  return (
    <section className="py-12 md:py-20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionVariants}
          className="text-3xl md:text-5xl font-bold text-center mb-10"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            {t('aboutMe.title')}
          </span>
        </motion.h2>

        {/* Professional Summary */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="relative p-6 rounded-xl border mb-10
                     bg-[var(--color-background-card)] border-[var(--color-border)] shadow-lg
                     group hover:shadow-xl transition-all duration-300
                     overflow-hidden" /* Removed animated-border-box and adjusted border class */
        >
          <h3 className="text-2xl font-semibold mb-4 text-[var(--color-primary)]">
            {t('aboutMe.summaryHeading')}
          </h3>
          <p className="text-lg md:text-xl leading-relaxed text-[var(--color-text)]">
            {t('aboutMe.summaryPart1')}{' '}
            <motion.span whileHover={{ scale: 1.02, textShadow: "0px 0px 8px rgba(var(--color-primary-rgb), 0.5)" }} className="highlight-primary inline-block">{t('aboutMe.summaryHighlight1')}</motion.span>
            {t('aboutMe.summaryPart2')}{' '}
            <motion.span whileHover={{ scale: 1.02, textShadow: "0px 0px 8px rgba(var(--color-secondary-rgb), 0.5)" }} className="highlight-secondary inline-block">{t('aboutMe.summaryHighlight2')}</motion.span>
            {t('aboutMe.summaryPart3')}{' '}
            <motion.span whileHover={{ scale: 1.02, textShadow: "0px 0px 8px rgba(var(--color-primary-rgb), 0.5)" }} className="highlight-primary inline-block">{t('aboutMe.summaryHighlight3')}</motion.span>
            {t('aboutMe.summaryPart4')}{' '}
            <motion.span whileHover={{ scale: 1.02, textShadow: "0px 0px 8px rgba(var(--color-secondary-rgb), 0.5)" }} className="highlight-secondary inline-block">{t('aboutMe.summaryHighlight4')}</motion.span>.
            {t('aboutMe.summaryPart5')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Technical Skills */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
            className="relative p-6 rounded-xl border
                        bg-[var(--color-background-card)] border-[var(--color-border)] shadow-lg
                        group hover:shadow-xl transition-all duration-300
                        overflow-hidden" /* Removed animated-border-box and adjusted border class */
          >
            <h3 className="text-2xl font-semibold mb-4 text-[var(--color-primary)]">
              {t('aboutMe.techSkillsHeading')}
            </h3>
            <motion.ul
              variants={itemVariants}
              className="list-disc list-inside space-y-2 text-[var(--color-text)]"
            >
              {[
                t('aboutMe.skill1'), t('aboutMe.skill2'), t('aboutMe.skill3'), t('aboutMe.skill4'),
                t('aboutMe.skill5'), t('aboutMe.skill6'), t('aboutMe.skill7'), t('aboutMe.skill8')
              ].map((skill, index) => (
                <motion.li key={index} variants={itemVariants}>{skill}</motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Soft Skills & Contact */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
            className="relative p-6 rounded-xl border
                        bg-[var(--color-background-card)] border-[var(--color-border)] shadow-lg
                        group hover:shadow-xl transition-all duration-300
                        overflow-hidden" /* Removed animated-border-box and adjusted border class */
          >
            <h3 className="text-2xl font-semibold mb-4 text-[var(--color-primary)]">
              {t('aboutMe.softSkillsHeading')}
            </h3>
            <motion.ul
              variants={itemVariants}
              className="list-disc list-inside space-y-2 mb-6 text-[var(--color-text)]"
            >
              {[t('aboutMe.softSkill1'), t('aboutMe.softSkill2'), t('aboutMe.softSkill3'), t('aboutMe.softSkill4')].map((skill, index) => (
                <motion.li key={index} variants={itemVariants}>{skill}</motion.li>
              ))}
            </motion.ul>

            <h3 className="text-2xl font-semibold mb-4 text-[var(--color-primary)]">
              {t('aboutMe.contactHeading')}
            </h3>
            <motion.div variants={itemVariants} className="space-y-2 text-[var(--color-text)]">
              <p>
                <strong>{t('aboutMe.phone')}:</strong> {t('aboutMe.phoneNumber')}
              </p>
              <p>
                <strong>{t('aboutMe.email')}:</strong>{' '}
                <motion.a
                  whileHover={{ scale: 1.01 }}
                  href={`mailto:${t('aboutMe.emailAddress')}`}
                  className="text-[var(--color-secondary)] hover:underline inline-block"
                >
                  {t('aboutMe.emailAddress')}
                </motion.a>
              </p>
              <p>
                <strong>{t('aboutMe.location')}:</strong> {t('aboutMe.locationValue')}
              </p>
              <p>
                <strong>GitHub:</strong>{' '}
                <motion.a
                  whileHover={{ scale: 1.01 }}
                  href={t('aboutMe.githubLink')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-secondary)] hover:underline inline-block"
                >
                  {t('aboutMe.githubUser')}
                </motion.a>
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Experience */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="relative p-6 rounded-xl border mb-10
                     bg-[var(--color-background-card)] border-[var(--color-border)] shadow-lg
                     group hover:shadow-xl transition-all duration-300
                     overflow-hidden" /* Removed animated-border-box and adjusted border class */
        >
          <h3 className="text-2xl font-semibold mb-4 text-[var(--color-primary)]">
            {t('aboutMe.experienceHeading')}
          </h3>

          <motion.div variants={itemVariants} className="mb-6 border-b border-[var(--color-border)] pb-6">
            <h4 className="text-xl font-semibold text-[var(--color-text)]">Idigital Studios <span className="text-[var(--color-text)] text-base font-normal">({t('aboutMe.idgDates')})</span></h4>
            <p className="text-[var(--color-secondary)] mb-2">{t('aboutMe.idgRole')}</p>
            <ul className="list-disc list-inside space-y-1 text-[var(--color-text)]">
              <li>{t('aboutMe.idgDuty1')}</li>
              <li>{t('aboutMe.idgDuty2')}</li>
              <li>{t('aboutMe.idgDuty3')}</li>
              <li>{t('aboutMe.idgDuty4')}</li>
              <li>{t('aboutMe.idgDuty5')}</li>
              <li>{t('aboutMe.idgDuty6')}</li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <h4 className="text-xl font-semibold text-[var(--color-text)]">Ferretería Hernández, Chalchuapa <span className="text-[var(--color-text)] text-base font-normal">({t('aboutMe.ferreteriaDates')})</span></h4>
            <p className="text-[var(--color-secondary)] mb-2">{t('aboutMe.ferreteriaRole')}</p>
            <ul className="list-disc list-inside space-y-1 text-[var(--color-text)]">
              <li>{t('aboutMe.ferreteriaDuty1')}</li>
              <li>{t('aboutMe.ferreteriaDuty2')}</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Education & Courses */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="relative p-6 rounded-xl border
                     bg-[var(--color-background-card)] border-[var(--color-border)] shadow-lg
                     group hover:shadow-xl transition-all duration-300
                     overflow-hidden" /* Removed animated-border-box and adjusted border class */
        >
          <h3 className="text-2xl font-semibold mb-4 text-[var(--color-primary)]">
            {t('aboutMe.educationHeading')}
          </h3>

          <motion.div variants={itemVariants} className="mb-6 border-b border-[var(--color-border)] pb-6">
            <h4 className="text-xl font-semibold text-[var(--color-text)]">Universidad Católica de El Salvador</h4>
            <p className="text-[var(--color-secondary)] mb-2">{t('aboutMe.universityDegree')} <span className="text-[var(--color-text)] text-base font-normal">({t('aboutMe.universityDates')})</span></p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold mb-4 text-[var(--color-primary)]">
              {t('aboutMe.coursesHeading')}
            </h3>
            <ul className="list-disc list-inside space-y-2 text-[var(--color-text)]">
              <li>{t('aboutMe.course1')} <span className="text-[var(--color-text)] text-base font-normal">({t('aboutMe.course1Date')})</span></li>
              <li>{t('aboutMe.course2')} <span className="text-[var(--color-text)] text-base font-normal">({t('aboutMe.course2Date')})</span></li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMeSection;